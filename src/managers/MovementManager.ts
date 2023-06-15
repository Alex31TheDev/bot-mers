import { Vec3 } from "vec3";
import Util from "../Util";

import BotClient from "../BotClient";
import IManager from "./IManager";

export default class MovementManager implements IManager {
    public isFlying = false;
    public speedFactor = 3;

    public origin!: Vec3;
    public destination!: Vec3;

    private client;
    private packetWrite!: (name: string, params: any) => void;

    constructor(client: BotClient) {
        this.client = client;
    }

    public init() {
        this.isFlying = false;
        this.packetWrite = this.client.bot._client.write.bind(this.client.bot._client);
    }

    public async speedFlyTo(coords: Vec3) {
        const pos = this.client.bot.entity.position;
        this.origin = pos;
        await this.client.bot.creative.flyTo(new Vec3(pos.x, coords.y, pos.z));

        this.client.bot._client.write = (name: string, params: any) => {
            if(typeof params.onGround !== "undefined") {
                params.onGround = false;
            }

            if(name.includes("position")) {
                return;
            }

            this.packetWrite(name, params);
        };

        const sethome = setInterval(() => this.client.bot.chat("/sethome"), 30000);

        await this.client.bot.lookAt(coords);
        this.destination = coords;
        this.isFlying = true;

        await Util.waitForCondition(() => !this.isFlying, "", -1);
        await this.client.bot.creative.stopFlying();

        this.client.bot._client.write = this.packetWrite;
        clearInterval(sethome);
    }

    public calculateMovement(yaw: number) {
        const mx = Math.cos(yaw + Math.PI),
              mz = Math.sin(yaw + Math.PI);

        return new Vec3(mx * this.speedFactor, 0, mz * this.speedFactor);
    }

    public sendMovementPacket(pos: Vec3) {
        this.packetWrite("position", pos);
    } 
}