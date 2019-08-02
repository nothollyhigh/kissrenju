import { GameDataManager } from "../Core/Managers/GameDataManager";
import View from "../Core/View";
import { C2S_Msg } from "./Proto/C2S_Handler/C2S_Msg";
import { EventManager } from "../Core/Managers/EventManager";
import { EventNames } from "./Support/EventNames";
const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
export class Chess extends View {
    private _x: number = -1
    private _y: number = -1
    private _chess: boolean = false //已经落子了
    private _sp: cc.Sprite = null

    start() {
        this.node.on(cc.Node.EventType.TOUCH_END, this._click, this)
    }

    private _click(): void {
        if (GameDataManager.ins.getPlayerByPos(null).Pos != GameDataManager.ins.curRound) {
            EventManager.emit(EventNames.SHOW_PANEL, { module: EventNames.Panel_Alert, data: { text: "暂时未到你噢!😄" } })
            return
        }
        if (this._chess) {
            EventManager.emit(EventNames.SHOW_PANEL, { module: EventNames.Panel_Alert, data: { text: "此位置已经有棋了" } })
            return
        }
        C2S_Msg.GoChess({ x: this._x, y: this._y })
    }
    //下棋的点
    public setSpot(x: number, y: number): void {
        this._x = x
        this._y = y
    }

    //获得下棋位置
    public getSpot(): { x: number, y: number } { return { x: this._x, y: this._y } }
    public setPos(x: number, y: number): void { this.node.setContentSize(x, y) }

    public walk(spfm: cc.SpriteFrame): void {
        this._chess = true
        if (this._sp) {
            this._sp.spriteFrame = spfm
        } else {
            let node = new cc.Node()
            node.setParent(this.node)
            let sp = node.addComponent(cc.Sprite)
            sp.spriteFrame = spfm
        }
    }


    public clear(): void {
        //这里做个简单小复用吧. 只删除图片
        //不移除节点
        this._chess = false
        if (this._sp) { this._sp.spriteFrame = null }
    }





}