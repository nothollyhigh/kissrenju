import View from "../Core/View";
import { ClientManager } from "../Core/Managers/ClientManager";
const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
// @executeInEditMode
export class GameScene extends View {
    //网络测试
    start() {
        let client = ClientManager.GetClient("test")
        client.connected("ws://127.0.0.1:8080")
        setTimeout(() => {
            console.log(111)
            ClientManager.SendMessageByClient("test", 1, {})
        }, 2000);
    }
}