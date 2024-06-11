package controllers

import (
	// "encoding/json"
	"net/http"
	"ppl/models"
	"ppl/helper"
)

func HomepageController(w http.ResponseWriter, r *http.Request) {
	var id int
	var judul string
	var penulis string
	var harga int
	var diskon int
	var cover string

	var list1 []models.BookItem
	// Get buku staff pick
	rows, err := DB.Query("SELECT b.bukuid, b.judul, c.nama, d.harga, d.diskon, b.cover FROM staff_pick a JOIN buku b ON b.bukuid = a.bukuid JOIN penulis c ON c.penulisid = b.penulisid JOIN format_buku d ON d.bukuid = b.bukuid LIMIT 10;")
	
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
	rows, err = DB.Query("SELECT a.bukuid, a.judul, b.nama, c.harga, c.diskon, a.cover FROM buku a JOIN penulis b ON b.penulisid = a.penulisid JOIN format_buku c ON c.bukuid = a.bukuid WHERE c.diskon > 0 ORDER BY diskon DESC LIMIT 10;")

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

	responseData := models.HomepageItem{List1: list1, List2: list2}

	response := models.NewSuccessResponse("OK", responseData)
	helper.WriteToResponseBody(w, http.StatusOK, response)

	// template
	// rows, err := DB.Query("SELECT bukuID, judul, penulis.nama, 
	// 						format.harga, format.diskon, cover 
	// 						FROM buku
	// 						INNER JOIN penulis ON penulis.penulisID = buku.penulis 
	// 						INNER JOIN format ON format.bukuID = buku.bukuID")

}