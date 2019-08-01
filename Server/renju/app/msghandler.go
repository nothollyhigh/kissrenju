package app

import "github.com/nothollyhigh/kiss/net"

func BindHandler(ws *net.WSServer)  {
	// websocket协议号
	ws.Handle(CMD_LOGIN_REQ, onLoginReq)
	ws.Handle(CMD_START_MATCH_REQ, Match)
}
