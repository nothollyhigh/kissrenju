package app

import (
	"kisscluster/renju/app/db"
	"math/rand"
	"sync"
	"time"
)

type Room struct {
	RoomID     string
	ChessPlay  int //当前到谁走棋
	GamePlay   [2]*Player
	ChessBoard [15][15]byte
}

var rooms = make(map[string]*Room)
var rw sync.RWMutex

func CheckRoom(roomId string) bool {
	_, ok := rooms[roomId]
	return ok
}

func GetRoomByID(roomid string) *Room {
	rw.RLock()
	defer rw.RUnlock()

	room, ok := rooms[roomid]
	if ok {
		return room
	}

	return nil
}

func NewRoom(roomId string, players []int) {
	rw.Lock()
	defer rw.Unlock()
	var plys [2]*Player
	for k := range plys {
		elem := &Player{}
		elem.ServerPos = byte(k)
		elem.ChessColor = byte(k)
		ud := UserManager.Get(players[k]).UserData().(*db.LoginInfo)
		ud.RoomId = roomId
		elem.PlayerUid = ud.ID
		elem.NickName = ud.Name
		plys[k] = elem
	}
	room := &Room{RoomID: roomId, GamePlay: plys}
	//room.ChessBoard
	room.Start()
	rooms[roomId] = room

}

func (r *Room) Start() {
	//通知玩家可以开始游戏
	startPlayer := r.GetStartPlayer()
	rsp := &StartMatchRsp{
		Roomid:   r.RoomID,
		CurRound: startPlayer,
		StartPos: startPlayer,
		Players:  r.GamePlay[:],
	}

	r.ChessPlay = startPlayer
	for _, v := range r.GamePlay {
		rsp.ServerPos = v.ServerPos
		UserManager.Get(v.PlayerUid).SendMsg(NewMessage(CMD_START_MATCH_RSP, rsp))
	}
}
func (r *Room) PlayerGoChess(pos ChessPos) {
	if r.ChessPlay == r.NextPlayer() {
		return
	}
	if r.ChessBoard[pos.X][pos.Y] != 0{
		return
	}
	rsp := &RoundInfo{
		ChessPos: ChessPos{
			X: pos.X,
			Y: pos.Y,
		},
		GoPlayer:r.ChessPlay,
	}
	r.ChessBoard[pos.X][pos.Y] = r.GamePlay[r.ChessPlay].ChessColor + 1
	r.NextPlayer()
	r.ChessPlay = r.NextPlayer()
	rsp.CurRound = r.ChessPlay

	r.Broadcast(CMD_GO_CHESS, rsp)
}

func (r *Room) NextPlayer() int {
	//轮到下一个玩家
	if r.ChessPlay != 1 {
		return 1
	} else {
		return 0
	}
}

//得到一个先手玩家
func (r *Room) GetStartPlayer() int {
	rand.Seed(time.Now().UnixNano())
	return GenerateRangeNum(1, 2) - 1
}

func (r *Room) Broadcast(cmd uint32, msg interface{}) {
	for _, v := range r.GamePlay {
		UserManager.Get(v.PlayerUid).SendMsg(NewMessage(cmd, msg))
	}
}
