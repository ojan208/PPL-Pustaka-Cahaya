package models

type ItemInfo struct {
	BukuID	string 	`json:"id"`
	Harga	int		`json:"price"`
	Jumlah	int		`json:"quantity"`
	Judul	string 	`json:"name"`
}

type UserInfo struct {
	Nama 		string `json:"first_name"`
	LastName 	string `json:"last_name"`
	Email 		string `json:"email"`
	NoTelp 		string `json:"phone"`
}

type TransactionInfo struct {
	OrderID		string 	`json:"order_id"`
	GrossAmount	int 	`json:"gross_amount"`
}

type Payload struct {
	Transaction	TransactionInfo 	`json:"transaction_details"`
	Items 		[]ItemInfo 			`json:"item_details"`
	User 		UserInfo 			`json:"customer_details"`
}