import BotClient from "../BotClient";
import IBotEvent from "./IBotEvent";

export default class messagestr implements IBotEvent {
    public name = "messagestr";
    
    public async handler(client: BotClient, msg: string) {
        if(client.config.consoleIsChat) {
            client.logger.info(msg);
        }

        if(msg.startsWith("Gamster ▸ You have been logged in!")) {
            client.loggedIn = true;
            return;
        }
    }
}