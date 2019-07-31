import { RenjuProxy } from "../Renju/Proto/RenjuProxy";
import { EventNamse } from "../Renju/Support/EventNames";
import { ClientManager } from "./Managers/ClientManager";
import { Event } from "./Managers/Event";
import { FEvent } from "./Support/FEvent";
import View from "./View";
import { ClientNames } from "../Renju/Support/ClientNames";

export class GameController {
    private _modules: { [key: string]: View } = {}

    constructor() {
        this.initDatas()
        this.addEvents()
    }

    private initDatas(): void { }

    private _netOpen(): void {
        Event.emit(EventNamse.SHOW_PANEL, { module: EventNamse.Panel_Login })
        new RenjuProxy()

    }
    private _netClose(): void { }

    private addEvents(): void {
        Event.on(EventNamse.SHOW_PANEL, this._showPanel, this)
        Event.on(EventNamse.NET_Connected, this._connected, this)
    }


    private _connected(): void {
        let client = ClientManager.GetClient(ClientNames.RENJU)
        client.connected("ws://127.0.0.1:8080")
        client.setCallBack(this, this._netOpen, this._netClose)
    }


    private _showPanel(evt: FEvent): void {
        if (evt.getData.hasOwnProperty("module")) {
            let data = evt.getData
            let module = evt.getData["module"]
            if (this._modules[module]) { this._modules[module].render(data.data) }
        }
    }


    public addModule(moduleName: string, Module: View): void {
        this._modules[moduleName] = Module
    }

    public getModule(moduleName: string): View {
        return this._modules[moduleName]
    }




}