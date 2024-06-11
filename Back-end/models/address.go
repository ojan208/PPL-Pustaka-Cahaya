package models

type Alamat struct {
	AlamatID 		int 		`json:"alamat_id"`
	Nama	 		string 		`json:"nama"`
	Provinsi		string		`json:"provinsi"	validate:"required"`
	Kabupaten		string		`json:"kabupaten"	validate:"required"`
	Kecamatan		string		`json:"kecamatan"	validate:"required"`
	Kelurahan		string		`json:"kelurahan"	validate:"required"`
	AlamatFull		string		`json:"alamat"		validate:"required"`
}