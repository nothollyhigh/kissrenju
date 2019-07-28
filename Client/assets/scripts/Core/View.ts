import { Event } from "./Managers/Event";
import { FEvent } from "./Support/FEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class View extends cc.Component {
    private _hello: string = "HelloWorld"

    start() { }

    protected addEvents(): void { }
    protected removeEvents(): void { }


    onEnable(): void {
        this.addEvents()
        // cc.game.on()
    }

    onDisable(): void {
        this.removeEvents()
    }
}
