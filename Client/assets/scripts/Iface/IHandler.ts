import { Message } from "../Core/Net/Message";

export interface IHandler {
    onDeal(client: WebSocket, msg: Message): void
}
