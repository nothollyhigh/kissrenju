import { GameController } from "./GameController";

export class AppMain {
    private static initialization: boolean = false
    private static gameController: GameController
    public static init(): void {
        if (this.initialization) { return }
        this.initialization = true
        this.gameController = new GameController()
    }

    public static getGameController(): GameController { return this.gameController }
}