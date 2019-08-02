package app

import (
	"fmt"
	"github.com/nothollyhigh/kiss/net"
	"kisscluster/renju/app/db"
	"math/rand"
	"strconv"
	"time"
)
var matchPool []int


func Match(cli *net.WSClient, msg net.IMessage)  {
	ud := cli.UserData().(*db.LoginInfo)
	if ud.ID == 0 {
		fmt.Println("玩家未登录")
		return
	}
	if len(matchPool) == 0{
		matchPool = append(matchPool,ud.ID)
		return
	}
	//加入匹配队列
	playnum := len(matchPool)
	pkid := -1
	if playnum == 1{
		pkid = matchPool[0]
	}else if playnum > 1{
		pkid = matchPool[0]
		matchPool = append(matchPool[:0], matchPool[1:]...)
	}

	players := []int{pkid,ud.ID}
	if pkid  != -1 {
		//可以开始游戏
		StartGame(players)
	}
}

func StartGame(players []int)  {
	rand.Seed(time.Now().UnixNano())
MAKE:
	var id= ""
	for i := 0; i < 6;i++{
		id += strconv.Itoa(GenerateRangeNum(0,9))
	}
	if ok := CheckRoom(id) ;ok {
		goto MAKE
	}
	NewRoom(id,players)
}

func GenerateRangeNum(min, max int) int {
	randNum := rand.Intn(max - min)
	randNum = randNum + min
	return randNum
}