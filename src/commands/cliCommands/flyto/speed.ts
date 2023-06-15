import BotClient from "../../../BotClient";
import BaseCommand from "../../BaseCommand";

export default class flyToSpeed extends BaseCommand {
    public name = "speed";
    public parent = "flyto";

    public handler(client: BotClient, args: string) {
        const speed = parseInt(args);
        this.say("Set speed to " + speed);

        client.managers.MovementManager.speedFactor = speed;
    }
}