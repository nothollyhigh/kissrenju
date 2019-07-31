import View from "../Core/View";
import { AppMain } from "../Core/AppMain";
import AlertPanel from "../Renju/Panel/AlertPanel";
import { EventNamse } from "../Renju/Support/EventNames";
import LoginPanel from "../Renju/Panel/LoginPanel";
import { Event } from "../Core/Managers/Event";

const { ccclass, property } = cc._decorator;
@ccclass
export class GameScene extends View {
    start(): void {
        let aleart = this.node.getChildByName("Alert").getComponent(AlertPanel)
        let loginPanel = this.node.getChildByName("Login").getComponent(LoginPanel)
        AppMain.getGameController().addModule(EventNamse.Panel_Login, loginPanel)
        AppMain.getGameController().addModule(EventNamse.Panel_Alert, aleart)
        //等待一些资源的加载完毕
        Event.emit(EventNamse.NET_Connected)
    }
}