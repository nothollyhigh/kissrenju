import { Client } from "../Net/Client";
import { Package } from "../Net/Package";

export class ClientManager {
    private static _clients: { [key: string]: Client } = {}

    //如果没有则创建
    public static GetClient(clientName: string): Client {
        if (this._clients[clientName]) { return this._clients[clientName] }
        this._clients[clientName] = Client.getClient()
        return this._clients[clientName]
    }

    public static SendMessageByClient(clientName: string, cmd: number, data: any): void {
        if (!this._clients[clientName]) { return }
        let pk = Package.getPackage(data)
        let msg = pk.WritePack(cmd)
        this._clients[clientName].sendMsg(msg)
    }

}