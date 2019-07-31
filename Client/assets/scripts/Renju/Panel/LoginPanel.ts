import View from "../../Core/View";
import { Event } from "../../Core/Managers/Event";
import { EventNamse } from "../Support/EventNames";
import { C2S_Msg } from "../Proto/C2S_Handler/C2S_Msg";

const { ccclass, property } = cc._decorator;
@ccclass
export default class LoginPanel extends View {
    private accLabel: cc.EditBox = null
    private pwdLabel: cc.EditBox = null


    start() {
        this.accLabel = this.node.getChildByName("Account").getComponent(cc.EditBox)
        this.pwdLabel = this.node.getChildByName("Password").getComponent(cc.EditBox)
    }

    protected show(): void {
        console.log("111")
        this.node.scale = 0;
        this.node.x = 560;
        cc.tween(this.node).to(0.25, { scale: 1, x: 0 }).start()
    }

    public click(): void {
        if (this.accLabel.string.length != 0 && this.pwdLabel.string.length != 0) {
            C2S_Msg.Login(this.accLabel.string, this.pwdLabel.string)
        }
    }
}
