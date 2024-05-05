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
	List3		[]BookItem	`json:"list3"`
}