import BotClient from "../BotClient";
import MovementManager from "./MovementManager";

import CLIManager from "./commandManagers/CLIManager";

export default class Managers {
    private client;

    public CLIManager!: CLIManager;
    public MovementManager! :MovementManager;

    constructor(client: BotClient) {
        this.client = client;

        if(client.config.enableCLICommands) {
            this.CLIManager = new CLIManager(client);
        }

        this.MovementManager = new MovementManager(client);
    }

    public async init() {
        for(const [_, value] of Object.entries(this)) {
            if("init" in value) {
                await value.init();
                this.client.logger.info("Loaded " + value.constructor.name);
            }
        }
    }
}