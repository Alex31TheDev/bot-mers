import BotClient from "../../BotClient";
import BaseCommand from "../BaseCommand";

export default class restart extends BaseCommand {
    public name = "restart";
    public aliases = ["r"];

    public handler(client: BotClient) {
        client.restartBot();
    }
}