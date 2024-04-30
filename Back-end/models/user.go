package models

type User struct {
	UserID 		int 		'json:"user_id" 	gorm:"primaryKey" '
	Email 		string 		'json:"email" 		gorm:"type:varchar(50)"  	validate:"required,email"'
	Password	string		'json:"password" 	gorm:"type:varchar(100)"  	validate:"required,min=8"'
	Username	string		'json:"username" 	gorm:"type:varchar(50)" '
	Nama		string		'json:"nama" 		gorm:"type:varchar(50)" '
	Jk			int			'json:"jk" 			gorm:"type:int" '
	NoTelp		string		'json:"no_telp" 	gorm:"type:varchar(15)" '
	role		int			'json:"role" 		gorm:"type:int" '
}