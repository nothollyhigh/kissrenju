package app

import (
	"fmt"
	"github.com/nothollyhigh/kiss/net"
	"github.com/nothollyhigh/kiss/util"
)

var (
	version string
	//confpath   = flag.String("config", "./conf/renju.json", "config file path, default is conf/plaza.json")
)

//启动一个websocket 服务端
func Startup(ver string) {
	version = ver
	conn, err := net.NewWebsocketServer("renju", ":8080")
	if err != nil {
		return
	}

	conn.HandleWs("/")

	conn.Handle(1, func(cli *net.WSClient, msg net.IMessage) {
		fmt.Printf("cli: %+v,msg:%v", cli, msg)
	})

	util.Go(func() {
		conn.Serve()
	})
}
