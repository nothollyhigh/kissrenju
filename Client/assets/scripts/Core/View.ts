import { AppMain } from "./AppMain";
import { Proxy } from "./Net/Proxy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class View extends cc.Component {
    onLoad() { AppMain.init() }
    protected addEvents(): void { }
    protected removeEvents(): void { }
    protected show(): void { }

    public render(data?: any): void {
        if (this.node.active == false) { this.node.active = true }
    }

    onEnable(): void {
        this.addEvents()
        this.show()
    }
    onDisable(): void { this.removeEvents() }
}
