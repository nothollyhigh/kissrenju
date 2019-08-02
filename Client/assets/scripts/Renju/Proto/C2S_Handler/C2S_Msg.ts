import { ClientManager } from "../../../Core/Managers/ClientManager";
import { ClientNames } from "../../Support/ClientNames";
import { cmdID } from "../cmdID";

export namespace C2S_Msg {
    export function Login(account: string, password: string): void {
        let data = { account: account, password: password }
        ClientManager.SendMessage(ClientNames.RENJU, cmdID.CMD_LOGIN_REQ, data)
    }

    export function Match(): void {
        ClientManager.SendMessage(ClientNames.RENJU, cmdID.CMD_START_MATCH, {})
    }

    //下棋动作
    export function GoChess(pos: any): void {
        ClientManager.SendMessage(ClientNames.RENJU, cmdID.CMD_GO_CHESS, pos)
    }
}