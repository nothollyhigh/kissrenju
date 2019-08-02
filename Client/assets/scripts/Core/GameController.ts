import { RenjuProxy } from "../Renju/Proto/RenjuProxy";
import { EventNames } from "../Renju/Support/EventNames";
import { ClientManager } from "./Managers/ClientManager";
import { EventManager } from "./Managers/EventManager";
import { FEvent } from "./Support/FEvent";
import View from "./View";
import { ClientNames } from "../Renju/Support/ClientNames";
import { GameDataManager } from "./Managers/GameDataManager";

export class GameController {
    private _modules: { [key: string]: View } = {}

    constructor() {
        this.initDatas()
        this.addEvents()
    }

    private initDatas(): void {
        window["GameDataManager"] = GameDataManager.ins
    }

    private _netOpen(): void {
        EventManager.emit(EventNames.SHOW_PANEL, { module: EventNames.Panel_Login })
        new RenjuProxy()

    }
    private _netClose(): void { }

    private addEvents(): void {
        EventManager.on(EventNames.SHOW_PANEL, this._showPanel, this)
        EventManager.on(EventNames.NET_Connected, this._connected, this)
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