package db

import (
	"github.com/nothollyhigh/kiss/mysql"
)
const testMysqlDBConn = "root:root@tcp(localhost:3306)/renju"
var dbMysql *mysql.Mysql

func init()  {
	dbMysql = mysql.New(mysql.Config{
		ConnString:        testMysqlDBConn,
		PoolSize:          10,
		KeepaliveInterval: 2, //300
	})
}


