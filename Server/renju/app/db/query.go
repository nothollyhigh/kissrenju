package db

import (
	"errors"
)

var mysqlLinkFail = errors.New("mysql connected error")

func SelectUser(account , pass string) (int, error) {
	if db := dbMysql.DB(); db != nil{
		var id int
		if err :=db.QueryRow(`select id from renju.user where account=? and password=?`, account,pass).Scan(&id); err != nil{
			return 0,mysqlLinkFail
		}
		return  id,nil
	}
	return 0,mysqlLinkFail
}

func SelectUserByid(id int) *LoginInfo {
	if db := dbMysql.DB(); db != nil{
		var info = &LoginInfo{}
		if err :=db.QueryRow(`select id,account,name,sex from renju.user where id=?`, id).Scan(&info.ID,&info.Account,&info.Name,&info.Sex); err != nil{
			return nil
		}

		return info
	}
	return nil
}

func InsterUser (account,pass,name string) (int,error) {
	if db := dbMysql.DB(); db != nil{
		ret,err := db.Exec(`insert into user (account, password,name) values(?, ?,?)`,account,pass,name)
		if err != nil{
			return -1,err
		}
		id,err := ret.LastInsertId()
		if err != nil{
			return -1,err
		}
		return  int(id),nil
	}

	return -1,mysqlLinkFail
}