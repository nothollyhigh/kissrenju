package app

import (
	"github.com/gorilla/websocket"
	"github.com/nothollyhigh/kiss/log"
	"github.com/nothollyhigh/kiss/net"
	"github.com/nothollyhigh/kiss/util"
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

	BindHandler(wsServer)

	util.Go(func() {
		wsServer.Serve()
	})

}

//启动一个websocket 服务端
func Startup() {
	//util.Go(userMgr.BroadcastLoop)

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
