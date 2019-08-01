import { Proxy } from "../../Core/Net/Proxy";
import { ClientManager } from "../../Core/Managers/ClientManager";
import { S2C_Login } from "./S2C_Handler/S2C_Login";
import { cmdID } from "./cmdID";
import { ClientNames } from "../Support/ClientNames";
import { S2C_StartGame } from "./S2C_Handler/S2C_StartGame";

export class RenjuProxy extends Proxy {
    public initClient(): void {
        this.client = ClientManager.GetClient(ClientNames.RENJU)
    }

    public setHandlers(): void {
        this.client.Handler.addHandler(cmdID.CMD_LOGIN_RSP, new S2C_Login)
        this.client.Handler.addHandler(cmdID.CMD_START_MATCH_RSP, new S2C_StartGame)
    }
}