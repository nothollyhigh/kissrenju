import { Package } from "./Package";
import { Handler } from "./Handler";
import { IHandler } from "../../Iface/IHandler";
import { MsgContent } from "./MsgContent";

export class Client {
    public static getClient(): Client {
        return new Client
    }

    private _ws: WebSocket = null
    private _status: boolean = false
    private _handler: Handler = null

    public connected(URI: string): void {
        if (URI.indexOf("ws://") == -1) { return }
        this._ws = new WebSocket(URI)
        this._ws.onclose = this._onClose.bind(this)
        this._ws.onmessage = this._onMessage.bind(this)
        this._ws.onerror = this._onError.bind(this)
        this._ws.onopen = this._onOpen.bind(this)
        this._ws.binaryType = "arraybuffer"
    }

    private _onOpen(): void {
        this._status = true
        console.log("连接成功")
    }

    private _onError(): void {
        this._status = false
        console.log("_onError")
    }

    private _onMessage(ev: MessageEvent): void {
        if (ev.data instanceof ArrayBuffer) {
            let pk = Package.getPackage(ev.data)
            pk.ReadPack()
            let handler = this.Handler.getHandlerByMsgid(pk.cmdID)
            if (handler != null) { handler.onDeal(this._ws, new MsgContent(pk.Data, pk.cmdID)) }
            else { console.log("Not Found cmdID:", "0x" + pk.cmdID) }
        }
    }

    private _onClose(): void {
        this._status = false
        console.log("_onClose")
    }

    public setHandler(msgid: number, handler: IHandler, cover: boolean = false): void {
        this._handler.addHandler(msgid, handler, cover)
    }

    public get Handler(): Handler { return this._handler }

    public sendMsg(data: any): void {
        if (!this._status) { return }
        this._ws.send(data)
    }




}