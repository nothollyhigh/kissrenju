import { Proxy } from "../../Core/Net/Proxy";
import { ClientManager } from "../../Core/Managers/ClientManager";
import { S2C_Login } from "./S2C_Handler/S2C_Login";

export class RenjuProxy extends Proxy {
    public initClient(): void {
        this.client = ClientManager.GetClient("RenJu")
    }

    public setHandlers(): void {
        this.client.Handler.addHandler(1, new S2C_Login)
    }
}