package app

import (
	"encoding/json"
	"github.com/nothollyhigh/kiss/net"
)

const (
	CMD_LOGIN_REQ       = iota + 0xA1 //登录请求
	CMD_LOGIN_RSP                     //登录响应
	CMD_START_MATCH_REQ               //开始匹配
	CMD_START_MATCH_RSP               //匹配成功
	CMD_GO_CHESS                      //走棋
)

//回合信息
type RoundInfo struct {
	CurRound int            `json:"curRound"` //到谁的回合
	GoPlayer int  			`json:"goPlayer"` //谁走的棋
	ChessPos `json:"Chess"` //走了什么棋
}

type ChessPos struct {
	X int `json:"x"`
	Y int `json:"y"`
}

type StartMatchRsp struct {
	Roomid    string    `json:"roomId"`
	Players   []*Player `json:"players"`
	StartPos  int       `json:"startPos"`  //开始走棋的人
	CurRound  int       `json:"curRound"`  //到谁的回合
	ServerPos byte      `json:"serverPos"` //当前玩家的服务器位置
}

type Player struct {
	ServerPos  byte   `json:"Pos"`
	NickName   string `json:"nickName"`
	ChessColor byte   `json:"chessColor"`
	PlayerUid  int    `json:"-"`
}

type LoginReq struct {
	Account  string `json:"account"`
	Password string `json:"password"`
}

type LoginRsp struct {
	Code int         `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data,omitempty"`
}

func NewMessage(cmd uint32, v interface{}) *net.Message {
	data, ok := v.([]byte)
	if !ok {
		data, _ = json.Marshal(v)
	}
	return net.NewMessage(cmd, data)
}
