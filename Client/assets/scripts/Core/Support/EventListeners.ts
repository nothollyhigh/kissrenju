import { FEvent } from "./FEvent";

export type EventHandler = (evt?: FEvent) => void

export class EventListeners {
    public handlers: EventHandler[]
    public targets: any[]
    public isInvoking: boolean
    private containCanceled: boolean

    constructor() {
        this.handlers = new Array<EventHandler>()
        this.targets = new Array()
        this.isInvoking = false
        this.containCanceled = false
    }

    //添加事件
    public addListener(handler: EventHandler, target: any): void {
        this.handlers.push(handler)
        this.targets.push(target)
    }

    public remove(index: number): void {
        if (index >= this.handlers.length) { return }
        this.handlers.splice(index, 1)
        this.targets.splice(index, 1)
    }

    public rmByTarget(target: any): void {
        let index = this.targets.indexOf(target)
        if (index != -1) { this.remove(index) }
    }

    public rmByHandler(handler: EventHandler): void {
        let index = this.handlers.indexOf(handler)
        if (index != -1) { this.remove(index) }
    }

    private _getIdx(handler: EventHandler, target: any): number {
        let hidx = this.handlers.indexOf(handler)
        let tidx = this.targets.indexOf(target)
        return hidx != -1 && tidx != -1 ? hidx : -1
    }


    public rmByHandTarget(handler: EventHandler, target: any): void {
        let idx = this._getIdx(handler, target)
        if (idx != -1) { this.remove(idx) }
    }

    public rmAll(): void {
        this.handlers.length = 0
        this.targets.length = 0
    }

    public cancel(index: number): void {
        this.handlers[index] = null
        this.targets[index] = null
        this.containCanceled = true
    }


    public cancelByTarget(target: any): void {
        let index = this.targets.indexOf(target)
        if (index != -1) { this.cancel(index) }
        this.containCanceled = true
    }

    public cancelByHandler(handler: EventHandler): void {
        let index = this.handlers.indexOf(handler)
        if (index != -1) { this.cancel(index) }
        this.containCanceled = true
    }

    public cancelByHandTarget(handler: EventHandler, target: any): void {
        let idx = this._getIdx(handler, target)
        if (idx != -1) { this.cancel(idx) }
        this.containCanceled = true
    }

    public cancelAll(): void {
        for (let i = 0; i < this.handlers.length; i++) {
            this.handlers[i] = null
            this.targets[i] = null
        }
        this.containCanceled = true
    }

    public has(handler: EventHandler, target: any): boolean {
        return this._getIdx(handler, target) != -1
    }

    //清除取消事件通知
    public purgeCanceled(): void {
        if (this.containCanceled) {
            this.rmByHandler(null)
            this.containCanceled = false
        }
    }
    //是否为空
    public isEmpty(): boolean {
        return this.handlers.length == 0
    }
}