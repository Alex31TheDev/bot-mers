import { Vec3 } from "vec3";

import BotClient from "../../../BotClient";
import BaseCommand from "../../BaseCommand";

export default class flyToStop extends BaseCommand {
    public name = "flyto";
    public subcmdNames = ["stop", "speed"];

    public handler(client: BotClient, args: string) {
        const split = args.split(" "),
              coords = new Vec3(parseInt(split[0]), parseInt(split[2]), parseInt(split[1]));

        this.say(`Flying to: ${coords.x}, ${coords.z} at y=${coords.y}`);
        client.managers.MovementManager.speedFlyTo(coords);
    }
}