import View from "../../Core/View";

const { ccclass, property } = cc._decorator;
@ccclass
export default class AlertPanel extends View {
    @property(cc.Label)
    private content: cc.Label = null

    private _func: Function = null

    protected addEvents(): void {
    }

    public render(data?: any): void {
        if (data.hasOwnProperty("fun")) { this._func = data["fun"] }
        if (data.hasOwnProperty("text")) { this.content.string = data["text"] }
        super.render(data)
    }

    private close(): void {
        this.node.active = false
        if (!!this._func && typeof this._func == "function") { this._func() }
    }

}