import View from "../Core/View";
import { AppMain } from "../Core/AppMain";
import AlertPanel from "../Renju/Panel/AlertPanel";
import { EventNames } from "../Renju/Support/EventNames";
import LoginPanel from "../Renju/Panel/LoginPanel";
import { EventManager } from "../Core/Managers/EventManager";
import UserPanel from "../Renju/Panel/UserPanel";
import ChessBoard from "../Renju/Panel/ChessBoard";

const { ccclass, property } = cc._decorator;
@ccclass
export class GameScene extends View {
    start(): void {
        let aleart = this.node.getChildByName("Alert").getComponent(AlertPanel)
        let loginPanel = this.node.getChildByName("Login").getComponent(LoginPanel)
        let UserInfo = this.node.getChildByName("UserInfo").getComponent(UserPanel)
        let Board = this.node.getChildByName("ChessBoard").getComponent(ChessBoard)
        AppMain.getGameController().addModule(EventNames.Panel_Login, loginPanel)
        AppMain.getGameController().addModule(EventNames.Panel_Alert, aleart)
        AppMain.getGameController().addModule(EventNames.Panel_UserInfo, UserInfo)
        AppMain.getGameController().addModule(EventNames.Panel_ChessBoard, Board)
        //等待一些资源的加载完毕
        EventManager.emit(EventNames.NET_Connected)
    }
}