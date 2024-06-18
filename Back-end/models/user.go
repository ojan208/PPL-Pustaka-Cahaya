package models

// butuh userid, email, pass, nama
type Account struct {
	UserID 		int 		`json:"user_id" 	gorm:"primaryKey" `
	Email 		string 		`json:"email" 		gorm:"type:varchar(254)"  	validate:"required,email"`
	Password	string		`json:"password" 	gorm:"type:varchar(100)"  	validate:"required,min=8"`
	Nama		string		`json:"nama" 		gorm:"type:varchar(50)" 	validate:"required"`
	Role		int			`json:"role" 		gorm:"type:tinyint" `
}

type UserLogin struct {
	UserID 		string 		`json:"user_id" 	gorm:"primaryKey"`
	Email 		string 		`json:"email" 		gorm:"type:varchar(254)"`
	Token 		string		`json:"token"`
}

type Profile struct {
	Email 		string 		`json:"email" 		gorm:"type:varchar(254)"  	validate:"required,email"`
	Username	string		`json:"username" 	gorm:"type:varchar(50)" `
	Nama		string		`json:"nama" 		gorm:"type:varchar(50)" 	validate:"required"`
	Jk			int			`json:"jk" 			gorm:"type:tinyint" `
	NoTelp		string		`json:"no_telp" 	gorm:"type:varchar(15)" `
	TglLahir	string 		`json:"tgl_lahir"`
}