import { Package } from "./Package";
import { Handler } from "./Handler";
import { IHandler } from "../../Iface/IHandler";
import { Message } from "./Message";

export class Client {
    public static getClient(): Client { return new Client }
    private _ws: WebSocket = null
    private _status: boolean = false
    private _handler: Handler = null
    private _target: any = null
    private _onOpen: Function = null
    private _onClose: Function = null

    public constructor() {
        this._handler = new Handler()
    }

    public connected(URI: string): void {
        if (URI.indexOf("ws://") == -1) { return }
        this._ws = new WebSocket(URI)
        this._ws.onclose = this.onClose.bind(this)
        this._ws.onmessage = this.onMessage.bind(this)
        this._ws.onerror = this.onError.bind(this)
        this._ws.onopen = this.onOpen.bind(this)
        this._ws.binaryType = "arraybuffer"
    }

    public setCallBack(target: any, Open: Function, Close: Function): void {
        this._target = target
        this._onOpen = Open
        this._onClose = Close
    }

    private onOpen(): void {
        this._status = true
        if (this._onOpen != null) { this._onOpen.call(this._target, null) }
    }

    private onError(): void {
        this._status = false
        if (this._onClose != null) { this._onClose.call(this._target, null) }
    }

    private onMessage(ev: MessageEvent): void {
        if (ev.data instanceof ArrayBuffer) {
            let pk = Package.getPackage(ev.data)
            pk.ReadPack()
            let handler = this.Handler.getHandlerByMsgid(pk.cmdID)
            if (handler != null) { handler.onDeal(this._ws, new Message(pk.Data, pk.cmdID)) }
            else { console.log("Not Found cmdID:", "0x" + pk.cmdID) }
        }
    }

    private onClose(): void {
        this._status = false
        if (this._onClose != null) { this._onClose.call(this._target, null) }
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