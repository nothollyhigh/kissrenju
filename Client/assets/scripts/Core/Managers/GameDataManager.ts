export type player = { Pos: number, nickName: string, chessColor: number, dir: number }
export class GameDataManager {
    private static _instance: GameDataManager
    public static get ins(): GameDataManager {
        if (!this._instance) { this._instance = new GameDataManager }
        return this._instance
    }

    public Name: string = ""
    public ID: number = 0
    public roomId: string = ""    //房间号
    private _players: player[] = [] //所有玩家
    public serverPos: number = 0  //服务器位置
    public startPos: number = 0   //开始走棋的人
    public curRound: number = 0   //当前到谁走棋

    public set players(val: player[]) {
        this._players = val
        for (let k in this.players) {
            this.players[k].dir = this.getLocalPos(this.players[k].Pos)
        }
    }

    public get players(): player[] { return this._players }



    public getLocalPos(serverPos: number): number { return ((2 - this.serverPos + serverPos)) % 2 }


    public getPlayerByPos(pos: number): player {
        if (pos == null) {
            return this.players[this.serverPos]
        }
        return this.players[pos]
    }
    public getPlayerByDir(dir: number): player {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].dir == dir) {
                return this.players[i]
            }
        }
    }

    public update(data: any): void {
        for (let k in data) {
            if (this.hasOwnProperty(k)) {
                this[k] = data[k]
            }
            else if (k in this) {
                this[k] = data[k]
            }
        }
    }
}