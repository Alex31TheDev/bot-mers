import BotClient from "../../../BotClient";
import BaseCommand from "../../BaseCommand";

import Util from "../../../Util";

export default class flyToRestart extends BaseCommand {
    public name = "restart";
    public parent = "flyto";

    public async handler(client: BotClient, args: string) {
        const dest = client.managers.MovementManager.destination;
        
        if(isNaN(dest.x) && isNaN(dest.y) && isNaN(dest.z)) {
            this.say("Can't restart, no position is set.");
            return;
        }

        if(args === "true") {
            client.bot.chat("/home");
            await Util.delay(500);
        }

        client.managers.MovementManager.speedFlyTo(dest);
    }
}