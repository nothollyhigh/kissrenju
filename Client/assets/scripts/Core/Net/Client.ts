export class Client {
    public static getClient(): Client {
        return new Client
    }

    private _ws: WebSocket = null
    private _status: boolean = false

    public connected(URI: string): void {
        if (URI.indexOf("ws://") == -1) { return }
        this._ws = new WebSocket(URI)
        this._ws.onclose = this._onClose.bind(this)
        this._ws.onmessage =this._onMessage.bind(this)
        this._ws.onerror = this._onError.bind(this)
        this._ws.onopen =  this._onOpen.bind(this)
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
        console.log("eve    ", ev)
    }
    private _onClose(): void {
        this._status = false
        console.log("_onClose")

    }


    public sendMsg(data: any): void {
        if (!this._status) { return }
        this._ws.send(data)
    }




}