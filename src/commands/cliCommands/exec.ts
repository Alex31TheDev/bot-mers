import BotClient from "../../BotClient";
import Util from "../../Util";
import BaseCommand from "../BaseCommand";

export default class exec extends BaseCommand {
    public name = "exec";

    public handler(client: BotClient, args: string) {
        const [cmdName, cmdArgs] = Util.splitArgs(args);

        client.logger.info(`Sending command ${cmdName}`);
        client.bot.chat(`/${cmdName} ${cmdArgs}`);
    }
}