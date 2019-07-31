package app

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"github.com/nothollyhigh/kiss/log"
	"github.com/nothollyhigh/kiss/net"
	"github.com/nothollyhigh/kiss/util"
	"sync/atomic"
	"time"
)

var (
	version string
	wsServer *net.WSServer
	//confpath   = flag.String("config", "./conf/renju.json", "config file path, default is conf/plaza.json")
)

func startWsServer()  {
	var err error
	//var cipher = net.NewCipherGzip(net.CipherGzipAll)

	wsServer, err = net.NewWebsocketServer("renju", ":8080")
	wsServer.HandleWs("/")
	if err != nil {
		log.Panic("NewWebsocketServer failed: %v", err)
	}

	wsServer.MessageType = websocket.BinaryMessage

	//wsServer.HandleNewCipher(func() net.ICipher { return cipher })

	// 前端静态资源

	// websocket协议号
	wsServer.Handle(CMD_LOGIN_REQ, onLoginReq)

	util.Go(func() {
		wsServer.Serve()
	})

}

//启动一个websocket 服务端
func Startup() {
	util.Go(userMgr.BroadcastLoop)

	startWsServer()
}
func Stop() {
	ch := make(chan int, 1)

	go func() {
		wsServer.Shutdown(time.Second*5, func(error) {})
		ch <- 1
	}()

	select {
	case <-ch:
	case <-time.After(time.Second * 5):
		log.Error("  Stop timeout")
	}
}

var (
	count int64 = 0
)

func onLoginReq(client *net.WSClient, msg net.IMessage) {
	var (
		err error
		req = &LoginReq{}
		rsp = &LoginRsp{}
	)

	if err = json.Unmarshal(msg.Body(), req); err != nil {
		rsp.Code = -1
		rsp.Msg = "错误的json数据格式"
		client.SendMsgWithCallback(NewMessage(CMD_LOGIN_RSP, rsp), userMgr.KickClient)
		return
	}

	rsp.Msg = "登录成功"
	rsp.Name = fmt.Sprintf("guest_%v", atomic.AddInt64(&count, 1))

	userMgr.Add(rsp.Name, client)
	client.OnClose("disconnected", func(*net.WSClient) {
		userMgr.Delete(rsp.Name)
	})

	client.SendMsg(NewMessage(CMD_LOGIN_RSP, rsp))

	userMgr.Broadcast(fmt.Sprintf("欢迎 %v 进入游戏！", rsp.Name))

	log.Info("onLoginReq success: %v", rsp.Name)
}