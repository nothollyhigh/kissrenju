export class GameDataManager {
    private static _instance: GameDataManager
    public static get ins(): GameDataManager {
        if (!this._instance) { this._instance = new GameDataManager }
        return this._instance
    }

    public Name: string = ""
    public ID: number = 0
    public Roomid: string = "" //房间号
    public Players: string[] = [] //所有玩家
    public serverPos: number = 0 //服务器位置
    public CurRound: number = 0


    public update(data: any): void {
        for (let k in data) {
            if (this.hasOwnProperty(k)) {
                this[k] = data[k]
            }
        }
    }
}