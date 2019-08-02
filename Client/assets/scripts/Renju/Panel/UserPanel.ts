import { EventManager } from "../../Core/Managers/EventManager";
import View from "../../Core/View";
import { EventNames } from "../Support/EventNames";
import { GameDataManager } from "../../Core/Managers/GameDataManager";
import { C2S_Msg } from "../Proto/C2S_Handler/C2S_Msg";


const { ccclass, property } = cc._decorator;
@ccclass
export default class UserPanel extends View {
    private nickname: cc.Label = null
    private id: cc.Label = null

    protected addEvents(): void {
        EventManager.on(EventNames.STARTGAME, this._StartGame, this)
    }


    private _StartGame(): void {
        cc.tween(this.node).to(0.25, { opacity: 0 }).start()
    }

    start() {
        this.nickname = this.node.getChildByName("nickname").getComponent(cc.Label)
        this.id = this.node.getChildByName("ID").getComponent(cc.Label)
        this.nickname.string = "昵称:" + GameDataManager.ins.Name
        this.id.string = "ID:" + GameDataManager.ins.ID

    }
    public render(data?: any): void {
        this.node.opacity = 0
        cc.tween(this.node).to(0.45, { opacity: 255 }).start()
        super.render(data)
    }

    public startMatch(): void { C2S_Msg.Match() }
}