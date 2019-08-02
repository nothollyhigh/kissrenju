import { GameDataManager, player } from "../Core/Managers/GameDataManager";
import View from "../Core/View";
import { EventManager } from "../Core/Managers/EventManager";
import { EventNames } from "./Support/EventNames";

const { ccclass, property } = cc._decorator;
export enum Pos {
    Self = 0,
    Other
}
@ccclass

export default class UserInfo extends View {
    @property(cc.Sprite)
    private point: cc.Sprite = null
    @property({ type: [cc.SpriteFrame] })
    private pointFrame: cc.SpriteFrame[] = new Array()
    @property({ type: cc.Label })
    private NickName: cc.Label = null

    private _UserData: player = null

    protected addEvents(): void {
        EventManager.on(EventNames.GOCHESS, this._goChess, this)
    }

    private _goChess(): void {
        this.point.spriteFrame = this.getWaitChessColor()
    }

    public init(dir: number): void {
        this._UserData = GameDataManager.ins.getPlayerByDir(dir)
        this.NickName.string = this._UserData.nickName
        this.point.spriteFrame = this.getWaitChessColor()
    }

    public getWaitChessColor(): cc.SpriteFrame {
        let color = GameDataManager.ins.curRound == this._UserData.Pos ? 1 : 0
        if (this._UserData.chessColor == 0) { return this.pointFrame[0 + color] }
        else { return this.pointFrame[2 + color] }
    }
}