import { GameDataManager } from "../../Core/Managers/GameDataManager";
import View from "../../Core/View";
import UserInfo from "../UserInfo";
import { EventManager } from "../../Core/Managers/EventManager";
import { EventNames } from "../Support/EventNames";

const { ccclass, property } = cc._decorator;
@ccclass
export default class ChessBoard extends View {
    @property([UserInfo])
    private Users: UserInfo[] = new Array

    public render(data?: any): void {
        super.render(data)

        let players = GameDataManager.ins.players
        for (let i = 0; i < players.length; i++) {
            let dir = players[i].dir
            this.Users[dir].init(dir)
        }

        if (GameDataManager.ins.getPlayerByPos(null).chessColor == 0) {
            EventManager.emit(EventNames.SHOW_PANEL, { module: EventNames.Panel_Alert, data: { text: "到你下棋了!😄" } })
        } else {
            EventManager.emit(EventNames.SHOW_PANEL, { module: EventNames.Panel_Alert, data: { text: "黑旗先行!" } })
        }
    }
}