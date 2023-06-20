import BotClient from "../BotClient";
import IBotEvent from "./IBotEvent";

import Util from "../Util";

export default class kicked implements IBotEvent {
    public name = "kicked";
    
    public async handler(client: BotClient, reason: string) {
        client.logger.info("Bot was kicked with reason: " + reason);

        if(client.config.autoRestart) {
            Util.delay(10000);
            await client.restartBot();
        }
    }
}