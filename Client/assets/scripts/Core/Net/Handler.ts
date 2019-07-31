import { IHandler } from "../../Iface/IHandler";



export class Handler {
    private _handler: { [key: string]: IHandler } = null

    constructor() { this._handler = {} }

    public addHandler(msgid: number, handler: IHandler, cover: boolean = false): void {
        if (cover) { this._handler[msgid] = handler }
        else {
            if (this._handler[msgid]) { console.log("已经存在的msgid:", "0x" + msgid.toString(16)) }
            else { this._handler[msgid] = handler }
        }
    }

    public getHandlerByMsgid(msgid: number): IHandler {
        if (this._handler[msgid]) { return this._handler[msgid] }
        else { return null }
    }

    public clear(): void { this._handler = {} }

}