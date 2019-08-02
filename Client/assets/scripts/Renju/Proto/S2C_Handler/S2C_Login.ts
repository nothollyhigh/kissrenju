import { MsgHander } from "../../../Core/Net/MsgHandler";
import { Message } from "../../../Core/Net/Message";
import { EventManager } from "../../../Core/Managers/EventManager";
import { EventNames } from "../../Support/EventNames";
import { GameDataManager } from "../../../Core/Managers/GameDataManager";

export class S2C_Login extends MsgHander {
    public onDeal(client: WebSocket, msg: Message): void {
        let data = msg.content
        if (data.code != 0) {
            EventManager.emit(EventNames.SHOW_PANEL, { module: EventNames.Panel_Alert, data: { text: data.msg } })
            return
        }

        GameDataManager.ins.update(data.data)
        EventManager.emit(EventNames.LOGINSUCCESS, data.data)
        EventManager.emit(EventNames.SHOW_PANEL, { module: EventNames.Panel_UserInfo })
        // EventManager.emit(EventNames.SHOW_PANEL, { module: EventNames.Panel_ChessBoard })
    }
}