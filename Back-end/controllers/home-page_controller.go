package controllers

import (
	// "encoding/json"
	"net/http"
	"ppl/models"
	"ppl/helper"
)

func HomepageController(w http.ResponseWriter, r *http.Request) {
	var list3 []models.BookItem

	var id int
	var judul string
	var penulis string
	var harga int
	var diskon int
	var cover string

	var list1 []models.BookItem
	// Get buku best seller item
	rows, err := DB.Query("SELECT bukuID, judul, penulis.nama, format.harga, format.diskon, cover, COUNT(bukuID) AS total_sales FROM buku INNER JOIN penulis ON penulis.penulisID = buku.penulis INNER JOIN format ON format.bukuID = buku.bukuID INNER JOIN detail_struk ON detail_struk.bukuID = buku.bukuID GROUP BY bukuID ORDER BY total_sales")
	
	if err != nil {
		// Ada masalah dgn koneksi server dan db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for rows.Next() {
		err := rows.Scan(&id, &judul, &penulis, &harga, &diskon, &cover)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		list1 = append(list1, models.BookItem{BookID: id, Judul: judul, Penulis: penulis, 
									Harga: harga, Diskon: diskon, Cover: cover})
	}

	// Get buku promo item
	var list2 []models.BookItem
	rows, err = DB.Query("SELECT bukuID, judul, penulis.nama, format.harga, format.diskon, cover FROM buku INNER JOIN penulis ON penulis.penulisID = buku.penulis INNER JOIN format ON format.bukuID = buku.bukuID ORDER BY diskon")
	if err != nil {
		// Ada masalah dgn koneksi server dan db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for rows.Next() {
		err := rows.Scan(&id, &judul, &penulis, &harga, &diskon, &cover)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		list2 = append(list2, models.BookItem{BookID: id, Judul: judul, Penulis: penulis, 
									Harga: harga, Diskon: diskon, Cover: cover})
	}

	// Get buku fantasi item
	rows, err = DB.Query("SELECT bukuID, judul, penulis.nama, format.harga, format.diskon, cover FROM buku INNER JOIN penulis ON penulis.penulisID = buku.penulis INNER JOIN format ON format.bukuID = buku.bukuID INNER JOIN genre ON genre.bukuID = buku.bukuID WHERE genre.nama = 'Fantasi'")
	if err != nil {
		// Ada masalah dgn koneksi server dan db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for rows.Next() {
		err := rows.Scan(&id, &judul, &penulis, &harga, &diskon, &cover)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		list3 = append(list3, models.BookItem{BookID: id, Judul: judul, Penulis: penulis, 
									Harga: harga, Diskon: diskon, Cover: cover})
	}
	defer rows.Close()

	if rows.Err() != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	responseData := models.HomepageItem{List1: list1, List2: list2, List3: list3}

	response := models.NewSuccessResponse("OK", responseData)
	helper.WriteToResponseBody(w, http.StatusOK, response)

	// template
	// rows, err := DB.Query("SELECT bukuID, judul, penulis.nama, 
	// 						format.harga, format.diskon, cover 
	// 						FROM buku
	// 						INNER JOIN penulis ON penulis.penulisID = buku.penulis 
	// 						INNER JOIN format ON format.bukuID = buku.bukuID")

}