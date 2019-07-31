export class Message {
    private _content: any
    private _msgid: number
    constructor(content: any, id: number) {
        this._content = content
        this._msgid = id
    }

    public get content(): any { return this._content }
    public get msgId(): number { return this._msgid }
}