package app

import (
	"encoding/json"
	"github.com/nothollyhigh/kiss/net"
	"kisscluster/renju/app/db"
)

func onLoginReq(cli *net.WSClient, msg net.IMessage) {
	var (
		err error
		req = &LoginReq{}
		rsp = &LoginRsp{}
	)

	if err = json.Unmarshal(msg.Body(),req);err != nil{
		rsp.Code = -1
		rsp.Msg = "登录失败"
		cli.SendMsg(NewMessage(CMD_LOGIN_RSP,rsp))
		return
	}

	id ,err := db.SelectUser(req.Account, req.Password)
	//	//如果没有这个用户则创建一个
	if err != nil{
		id,err = db.InsterUser(req.Account, req.Password, req.Account)
		if err != nil{
			rsp.Code = -1
			rsp.Msg = "登录失败,出现未知错误"
			cli.SendMsg(NewMessage(CMD_LOGIN_RSP,rsp))
			return
		}
	}
	//添加到用户管理器
	info := db.SelectUserByid(id)
	cli.SetUserData(info)
	UserManager.Add(id,cli)

	cli.OnClose("disconnected", func(*net.WSClient) {
		UserManager.Delete(info.ID)
		//从匹配队列移除
		for k,v:= range matchPool {
			if v == info.ID {
				matchPool = append(matchPool[:k],matchPool[k+1:]...)
			}
		}
	})
	rsp.Code = 0
	rsp.Msg = "登录成功"
	rsp.Data = info
	cli.SendMsg(NewMessage(CMD_LOGIN_RSP,rsp))
}