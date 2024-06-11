package connect

import (
	"database/sql"
	// "fmt"
	// "github.com/gofiber/fiber/v2/log"
	_ "github.com/go-sql-driver/mysql"
)

const (
	host = "127.0.0.1"
	port = "3306"
	user = "root"
	password = ""
	dbname = "pustaka_cahaya"
)

func ConnectDB() (*sql.DB, error) {
	db, err := sql.Open("mysql", user+":"+password+"@tcp("+host+":"+port+")/"+dbname+"?parseTime=true")
	
	if err != nil {
		panic(err)

		return nil, err
	}
	
	return db, nil
}