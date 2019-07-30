
const { ccclass, property } = cc._decorator;

@ccclass
export default class View extends cc.Component {
    start() { }
    protected addEvents(): void { }
    protected removeEvents(): void { }
    onEnable(): void { this.addEvents() }
    onDisable(): void { this.removeEvents() }
}
