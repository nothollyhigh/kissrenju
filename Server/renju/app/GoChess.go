package app

import (
	"encoding/json"
	"github.com/nothollyhigh/kiss/net"
	"kisscluster/renju/app/db"
)

func GoChess(cli *net.WSClient, msg net.IMessage) {
	ud := cli.UserData().(*db.LoginInfo)
	if ud.RoomId == ""{
		//没有房间玩个蛋
		return
	}

	room := GetRoomByID(ud.RoomId)
	if room == nil{
		return
	}

	req:= &ChessPos{}

	if err := json.Unmarshal(msg.Body(),req);err != nil{
		return
	}
	room.PlayerGoChess(*req)
}