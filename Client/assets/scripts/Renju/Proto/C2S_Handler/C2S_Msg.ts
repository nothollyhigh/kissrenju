import { ClientManager } from "../../../Core/Managers/ClientManager";
import { ClientNames } from "../../Support/ClientNames";
import { cmdID } from "../cmdID";

export namespace C2S_Msg {
    export function Login(account: string, password: string): void {
        let data = { account: account, password: password }
        ClientManager.SendMessage(ClientNames.RENJU, cmdID.LOGIN, data)
    }
}