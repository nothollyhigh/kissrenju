import { IHandler } from "../../Iface/IHandler";
import { Message } from "./Message";

export abstract class MsgHander implements IHandler {
    public abstract onDeal(client: WebSocket, msg: Message): void
}