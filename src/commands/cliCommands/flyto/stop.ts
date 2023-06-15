import BotClient from "../../../BotClient";
import BaseCommand from "../../BaseCommand";

export default class flyToStop extends BaseCommand {
    public name = "stop";
    public parent = "flyto";

    public handler(client: BotClient) {
        this.say("Stopping flight");
        client.managers.MovementManager.isFlying = false;
    }
}