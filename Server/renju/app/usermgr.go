package app

import (
	"github.com/nothollyhigh/kiss/net"
	"sync"
)

var (
	UserManager = &UserMgr{
		users: map[int]*net.WSClient{},
	}
)

type UserMgr struct {
	sync.RWMutex
	users map[int]*net.WSClient
}

func (mgr *UserMgr) Add(id int, client *net.WSClient) {
	mgr.Lock()
	defer mgr.Unlock()

	mgr.users[id] = client
}

func (mgr *UserMgr)Get(id int) *net.WSClient  {
	mgr.Lock()
	defer mgr.Unlock()
	client,ok := mgr.users[id]
	if ok {
		return  client
	}
	return nil
}

func (mgr *UserMgr) Delete(id int) {
	mgr.Lock()
	defer mgr.Unlock()
	delete(mgr.users, id)
}

func (mgr *UserMgr) KickClient(client *net.WSClient, err error) {
	client.Stop()
}

func (mgr *UserMgr) SendMessages(players []int,msg net.IMessage)  {
	mgr.RLock()
	defer mgr.RUnlock()

	for _,v := range players{
		client, ok :=  mgr.users[v]
		if ok {
			client.SendMsg(msg)
		}
	}
}

//func (mgr *UserMgr) Broadcast(msg string) {
//	mgr.RLock()
//	defer mgr.RUnlock()
//
//	for _, client := range mgr.users {
//		client.SendMsg(NewMessage(CMD_BROADCAST_NOTIFY, &BroadcastNotify{Msg: msg}))
//	}
//
//	log.Info("Broadcast to %d clients: %v", len(mgr.users), msg)
//}
//
//func (mgr *UserMgr) BroadcastLoop() {
//	for i := 0; true; i++ {
//		time.Sleep(time.Second * 3)
//		mgr.Broadcast(fmt.Sprintf("广播消息 %v", i))
//	}
//}