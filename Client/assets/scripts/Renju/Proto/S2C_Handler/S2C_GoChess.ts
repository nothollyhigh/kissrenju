import { Message } from "../../../Core/Net/Message";
import { MsgHander } from "../../../Core/Net/MsgHandler";
import { GameDataManager } from "../../../Core/Managers/GameDataManager";
import { EventManager } from "../../../Core/Managers/EventManager";
import { EventNames } from "../../Support/EventNames";

export class S2C_GoChess extends MsgHander {
    public onDeal(client: WebSocket, msg: Message): void {
        let data = msg.content
        GameDataManager.ins.update(data)
        EventManager.emit(EventNames.GOCHESS, data)
    }
}
