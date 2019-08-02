import { Chess } from "./Chess";
import View from "../Core/View";
import { EventManager } from "../Core/Managers/EventManager";
import { EventNames } from "./Support/EventNames";
import { FEvent } from "../Core/Support/FEvent";
import { GameDataManager } from "../Core/Managers/GameDataManager";

//绘制棋盘

type chessBoard = {
    node: cc.Node
}
//
const start_pos: number = -231 //起始坐标为左下角
const chessSize: number = 15 //棋盘大小
//{x:1,y:1} = {}

const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
// @executeInEditMode
export class drawBoard extends View {
    private _chessBoard: { [key: string]: Chess }//保存的棋盘信息
    @property(cc.Node)
    private chessContent: cc.Node = null //保存棋子的容器
    @property([cc.SpriteFrame])
    private chessFrame: cc.SpriteFrame[] = new Array

    private _getNode(): cc.Node {
        let node = new cc.Node
        node.setContentSize(33, 33)
        return node
    }

    protected addEvents(): void {
        EventManager.on(EventNames.GOCHESS, this._goChess, this)
    }

    private _goChess(evt: FEvent): void {
        let data: { goPlayer: number, Chess: { x: number, y: number } } = evt.getData
        let player = GameDataManager.ins.getPlayerByPos(data.goPlayer)
        this.getChess(data.Chess.x, data.Chess.y).walk(this.chessFrame[player.chessColor])
    }

    start() {
        this._chessBoard = {}
        this.draw()
    }
    //绘制
    public draw(): void {
        for (let y = 0; y < chessSize; y++) {
            //生成横向
            for (let x = 0; x < chessSize; x++) {
                let node = this._getNode()
                let chess = node.addComponent(Chess)
                node.setParent(this.chessContent)
                node.setPosition(cc.v2(start_pos + x * 33, start_pos + y * 33))
                let str = JSON.stringify({ x: x, y: y })
                this._chessBoard[str] = chess
                chess.setSpot(x, y)
            }
        }
    }

    public getChess(x: number, y: number): Chess {
        let str = JSON.stringify({ x: x, y: y })
        return this._chessBoard[str]
    }
}