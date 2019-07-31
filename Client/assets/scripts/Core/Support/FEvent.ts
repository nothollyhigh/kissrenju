export class FEvent {
    private _data: any
    private _event: string
    constructor(evt: string, data: any) {
        this._data = data
        this._event = evt
    }

    public get getData(): any { return this._data }
    public get event(): string { return this._event }
}