import { EventHandler, EventListeners } from "../Support/EventListeners";
import { FEvent } from "../Support/FEvent";

export class EventManager {
    private static _eventMap: { [key: string]: EventListeners } = {}

    public static emit(evtName: string, data?: any): void {
        let listeners = this._eventMap[evtName]
        if (!listeners || listeners.isEmpty()) { return }

        listeners.isInvoking = true
        let handlers = listeners.handlers
        let targets = listeners.targets

        for (let i = 0, len = handlers.length; i < len; i++) {
            let handler = handlers[i]
            let target = targets[i]
            if (!handler) { continue }
            if (target && (<cc.Component>target).node) {
                let node = (target as cc.Component).node
                if (cc.isValid(node)) { handler.call(target, new FEvent(evtName, data)) }
                else { listeners.cancelByTarget(target) }
            }
            else { handler.call(target, new FEvent(evtName, data)) }
        }
        listeners.isInvoking = false
        listeners.purgeCanceled()
    }

    public static on(evtName: string, handler: EventHandler, target: any = null): void {
        let listener = this._eventMap[evtName]
        if (!listener) {
            listener = new EventListeners
            this._eventMap[evtName] = listener
        }
        listener.addListener(handler, target)
    }

    public static once(evtName: string, handler: EventHandler, target: any = null): void {
        let wrapperCB: EventHandler
        wrapperCB = (evt: FEvent) => {
            this.rm(evtName, handler, target)
            handler.call(target, evt)
        }
        this.on(evtName, wrapperCB, target)
    }

    public static rm(evtName: string, handler: EventHandler, target: any = null): void {
        let listeners = this._eventMap[evtName]
        if (!listeners || listeners.isEmpty()) { return }
        if (target) {
            if (listeners.isInvoking) { listeners.cancelByHandTarget(handler, target) }
            else { listeners.rmByHandTarget(handler, target) }
        } else {
            if (listeners.isInvoking) { listeners.cancelByHandler(handler) }
            else { listeners.rmByHandler(handler) }
        }
    }

    public static rmByTarget(target: any): void {
        for (let k in this._eventMap) {
            let ls = this._eventMap[k]
            if (ls.isEmpty()) { return }
            if (ls.isInvoking) { ls.cancelByTarget(target) }
            else { ls.rmByTarget(target) }
        }
    }
    public static rmByEventName(evtName: string): void {
        let listeners = this._eventMap[evtName]
        if (!listeners || listeners.isEmpty()) { return }
        if (listeners.isInvoking) { listeners.cancelAll() }
        else { listeners.rmAll() }
    }

}