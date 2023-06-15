import BotClient from "../../BotClient";
import BaseCommand from "../BaseCommand";

export default class fly extends BaseCommand {
    public name = "coords";
    public aliases = ["c"];

    public handler(client: BotClient) {
        const pos = client.bot.entity.position.round();
        this.say(`Bot position: ${pos.toString()}`);
    }
}