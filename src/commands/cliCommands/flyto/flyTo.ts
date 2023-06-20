import { Vec3 } from "vec3";

import BotClient from "../../../BotClient";
import BaseCommand from "../../BaseCommand";

export default class flyToStop extends BaseCommand {
    public name = "flyto";
    public subcmdNames = ["stop", "speed", "restore"];

    public handler(client: BotClient, args: string) {
        const split = args.split(" "),
              x = parseInt(split[0]),
              y = parseInt(split[1]),
              z = parseInt(split[2]);

        if(isNaN(x) || isNaN(y) || isNaN(z)) {
            this.say(`Invalid coordonates: (${split[0]}, ${split[1]}, ${split[2]})`);
            return;
        }
        
        this.say(`Flying to: ${x}, ${z} at y=${y}`);
        const coords = new Vec3(x, y, z);
        client.managers.MovementManager.speedFlyTo(coords);
    }
}