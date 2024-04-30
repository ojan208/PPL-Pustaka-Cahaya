import {
	"gorm.io/gorm"
	"gorm.io/driver/mysql"
	"fmt"
}

const {
	host = "127.0.0.1"
	port = "3306"
	user = "root"
	password = ""
	dbname = "pustaka_cahaya"
}

var DB *gorm.DB

func ConnectDB() {
	db, err := gorm.Open(mysql.Open(user+":"+password+"@tcp("+host+":"+port+")/"+dbname))
	
	if err != nil {
		panic(err)
	}

	DB = db
}