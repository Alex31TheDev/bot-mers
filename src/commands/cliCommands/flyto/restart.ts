import { Vec3 } from "vec3";

import BotClient from "../../../BotClient";
import BaseCommand from "../../BaseCommand";

export default class flyToRestart extends BaseCommand {
    public name = "restart";
    public parent = "flyto";

    public handler(client: BotClient) {
        const dest = client.managers.MovementManager.destination;
        
        if(isNaN(dest.x) && isNaN(dest.y) && isNaN(dest.z)) {
            this.say("Can't restart, no position is set.");
            return;
        }

        client.managers.MovementManager.speedFlyTo(dest);
    }
}