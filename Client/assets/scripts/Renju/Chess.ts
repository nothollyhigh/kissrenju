import View from "../Core/View";
const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
export class Chess extends View {
    private _x: number = -1
    private _y: number = -1
    private _sp: cc.Sprite = null
    // @property([cc.SpriteFrame])
    // private chessSp: cc.SpriteFrame[] = null

    start() {
        this.node.on(cc.Node.EventType.TOUCH_END, this._click, this)
    }


    private _click(): void {
        cc.log("Log", this._x, this._y)
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
        if (this._sp) { this._sp.spriteFrame = null }
    }





}