import { Bot, BotEvents, createBot } from "mineflayer";

import { Config, configDefaults } from "./config/Config";
import Auth from "./config/Auth";

import createLogger from "./logger/createLogger";
import Util from "./Util";

import IBotEvent from "./events/IBotEvent";
import EventList from "./events";
import Managers from "./managers/Managers";

export default class BotClient {
    public config;
    public auth;
    
    public bot!: Bot;
    public managers!: Managers;

    public logger;
    public events = new Map<string, IBotEvent>();

    public connected = false;
    public spawned = false;
    public loggedIn = false;

    constructor(config: Config, auth: Auth) {
        this.config = {
            ...configDefaults,
            ...config
        };
        this.auth = auth;

        this.logger = createLogger({
            name: "Jhon bot",
            filename: config.logFile,
            console: true,
            fileFormat: [
                {
                    name: "timestamp",
                    prop: {
                        format: "YYYY-MM-DD HH:mm:ss",
                    },
                },
                {
                    name: "errors",
                    prop: {
                        stack: true,
                    },
                },
                "json",
            ],
            consoleFormat: [
                {
                    name: "timestamp",
                    prop: {
                        format: "YYYY-MM-DD HH:mm:ss",
                    },
                },
                {
                    name: "printf",
                    prop: ({ level, message, timestamp, stack }:
                           { level: string, message: string, timestamp: string, stack: object}) =>
                        `[${timestamp}] - ${level}: ${message}  ${level == "error" ? stack : ""}`,
                },
                "colorize",
            ],
        });
    }

    public async startBot() {
        this.logger.info("Loading managers...");
        this.managers = new Managers(this);

        await this.connectBot();
        await this.managers.init();
    }

    public async restartBot() {
        this.logger.info("Restarting bot...");

        if(this.connected) {
            this.bot.quit();
        }

        await this.connectBot();
        await this.managers.init();
    }

    private async connectBot() {
        this.createBot();

        await this.waitForSpawn();
        this.logger.info("Sending login...");
        this.sendLogin();

        await this.waitForLogin();
        this.logger.info("Successfully logged in.");

        await this.joinSection();
    }

    private createBot() {
        this.logger.info("Creating bot...");
        this.bot = createBot({
            host: this.config.server_ip,
            port: this.config.server_port,
            username: this.auth.username,
            version: this.config.version
        });
        this.connected = true;

        this.logger.info("Loading events...");
        this.loadEvents();
    }

    private async joinSection() {
        this.logger.info("Joining section...");
        this.bot.setQuickBarSlot(0);
        this.bot.activateItem();

        await Util.delay(300);
        this.bot.clickWindow(18, 0, 0);

        await this.waitForSpawn();
        this.logger.info("Successfully joined section.");
    }

    private loadEvents() {
        let ok = 0, bad = 0;

        for(const eventClass of EventList) {
            try {
                const event: IBotEvent = new eventClass(),
                      handler = event.handler.bind(undefined, this);
    
                if(event.once ?? false) {
                    this.bot.once(event.name as keyof BotEvents, handler);
                } else {
                    this.bot.on(event.name as keyof BotEvents, handler);
                }
    
                this.events.set(event.name, event);
                ok++;
            } catch(err) {
                this.logger.error("Failed to load event.", err);
                bad++;
            }
        }

        this.logger.info(`Loaded ${ok + bad} events. ${ok} successful, ${bad} failed.`);
    }

    private waitForLogin() {
        return Util.waitForCondition(() => this.loggedIn, "Bot didn't login in time.");
    }

    private waitForSpawn() {
        return Util.waitForCondition(() => this.spawned, "Bot didn't spawn in time.");
    }

    private sendLogin() {
        this.bot.chat(`/login ${this.auth.password}`);
    }

    public quit() {
        this.logger.info("Disconnecting bot...");
        this.bot.quit();
        process.exit(0);
    }
}