package models

type CartRead struct {
	BukuID	int 	`json:"bukuID"`
	Judul	string 	`json:"judul"`
	Format	string 	`json:"format"`
	Jumlah	int		`json:"jumlah"`
	Berat	float64	`json:"berat"`
	Harga	int		`json:"harga"`
	Diskon	int		`json:"diskon"`
}

type CartReq struct {
	BukuID 	[]int	`json:"bukuID"`
	Jumlah	int 	`json:"jumlah"`
}