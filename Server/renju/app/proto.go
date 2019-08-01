package app

import (
	"encoding/json"
	"github.com/nothollyhigh/kiss/net"
)

const (
	CMD_LOGIN_REQ  = iota + 0xA1  //登录请求
	CMD_LOGIN_RSP  //登录响应
	CMD_START_MATCH_REQ  //开始匹配
	CMD_START_MATCH_RSP  //匹配成功
)

type StartMatchRsp struct {
	Roomid string
	NickName []string
	ServerPos int
	CurRound int  //到谁的回合
}

type LoginReq struct {
	Account string  `json:"account"`
	Password string `json:"password"`
}

type LoginRsp struct {
	Code int `json:"code"`
	Msg string `json:"msg"`
	Data interface{} `json:"data,omitempty"`
}





func NewMessage(cmd uint32, v interface{}) *net.Message {
	data, ok := v.([]byte)
	if !ok {
		data, _ = json.Marshal(v)
	}
	return net.NewMessage(cmd, data)
}
