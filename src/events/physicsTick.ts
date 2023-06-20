import BotClient from "../BotClient";
import IBotEvent from "./IBotEvent";

export default class physicsTick implements IBotEvent {
    public name = "physicsTick";
    
    public handler(client: BotClient) {
        if(client.managers.MovementManager.isFlying) {
            const pos = client.bot.entity.position;

            if(pos.distanceTo(client.managers.MovementManager.origin) >
               client.managers.MovementManager.destination.distanceTo(client.managers.MovementManager.origin)) {
                client.managers.MovementManager.flyToEnd();
                return;
            }

            const to = client.managers.MovementManager.calculateMovement(client.bot.entity.yaw);
            client.managers.MovementManager.sendMovementPacket(pos.add(to));
        }
    }
}