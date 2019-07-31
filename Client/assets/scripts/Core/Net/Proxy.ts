import { Client } from "./Client";

export abstract class Proxy {
    protected client: Client
    constructor() {
        this.initClient()
        this.setHandlers()
    }

    //初始化client 的代理
    public abstract initClient(): void

    //绑定消息处理函数
    public abstract setHandlers(): void
}