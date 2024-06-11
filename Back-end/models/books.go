package models

type BookItem struct {
	BookID		int		`json:"bukuID"`
	Judul		string	`json:"judul"`
	Penulis		string	`json:"penulis"`
	Harga		int		`json:"harga"`
	Diskon		int		`json:"diskon`
	Cover		string	`json:"cover"`
}

type HomepageItem struct {
	List1		[]BookItem 	`json:"list1"`
	List2		[]BookItem	`json:"list2"`
	// List3		[]BookItem	`json:"list3"`
}

type BookFormat struct {
	Format		string	`json:"format"`
	Harga		int		`json:"harga"`
	Diskon		int		`json:"diskon"`
}

type BookDetail struct {
	BookID		int				`json:"bukuID"`
	Judul		string			`json:"judul"`
	Deskripsi	string			`json:"deskripsi"`
	Jml_hal		int				`json:"jumlah_halaman"`
	Isbn		string			`json:"ISBN"`
	Berat		float32			`json:"berat"`
	Panjang		float32			`json:"panjang"`
	Lebar		float32			`json:"lebar"`
	Bahasa		string			`json:"bahasa"`
	Penulis		string			`json:"penulis"`
	Penerbit	string			`json:"penerbit"`
	Cover		string			`json:"cover"`
	Format		[]BookFormat	`json:"format"`
}