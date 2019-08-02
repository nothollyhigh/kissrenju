import { MsgHander } from "../../../Core/Net/MsgHandler";
import { Message } from "../../../Core/Net/Message";
import { EventManager } from "../../../Core/Managers/EventManager";
import { EventNames } from "../../Support/EventNames";
import { GameDataManager } from "../../../Core/Managers/GameDataManager";

export class S2C_StartGame extends MsgHander {
    public onDeal(client: WebSocket, msg: Message): void {
        let data = msg.content
        console.log("S2C_StartGame", data)
        GameDataManager.ins.serverPos = data.serverPos
        GameDataManager.ins.update(data)
        EventManager.emit(EventNames.STARTGAME, data)
        EventManager.emit(EventNames.SHOW_PANEL, { module: EventNames.Panel_ChessBoard })
    }
}
