import { Chess } from "./Chess";
import View from "../Core/View";

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
export class DrawBoard extends View {
    private _chessBoard: { [key: string]: Chess }//保存的棋盘信息
    @property(cc.Node)
    private chessContent: cc.Node = null //保存棋子的容器

    private _getNode(): cc.Node {
        let node = new cc.Node
        node.setContentSize(33, 33)
        return node
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