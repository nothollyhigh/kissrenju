package app

type Room struct {
	RoomID string
	GamePlay []int
}

var rooms = make(map[string]*Room)
func CheckRoom(roomId string) bool{
	_,ok := rooms[roomId]
	return ok
}


func NewRoom(roomId string,players []int)  {
	rooms[roomId] = &Room{RoomID:roomId,GamePlay:players}
}