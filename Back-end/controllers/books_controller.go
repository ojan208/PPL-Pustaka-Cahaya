package controllers

import (
	// "encoding/json"
	"net/http"
	"ppl/models"
	"ppl/helper"
	"github.com/gorilla/mux"
	// "fmt"
	"strconv"
)

func BooksCatalogController(w http.ResponseWriter, r *http.Request) {
	// genreParam := r.URL.Query().Get("genre")
	// if genreParam == "" {
	// 	http.Error(w, err.Error(), http.StatusNotFound)
	// 	return
	// }

	pageParam := r.URL.Query().Get("page")
	if pageParam == "" {
		pageParam = "1"
	}

	pageNum, err := strconv.Atoi(pageParam)
	if err != nil {
		response := models.NewErrorResponse("Gagal mendapatkan list buku", "Parameter yang diberikan invalid", "Invalid parameter")
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	rows, err := DB.Query("SELECT a.bukuid, a.judul, b.nama, c.harga, c.diskon, a.cover FROM buku a JOIN penulis b ON b.penulisid = a.penulisid JOIN format_buku c ON c.bukuid = a.bukuid")
	if err != nil {
		// Ada kesalahan dengan koneksi db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var tempBuku models.BookItem
	var listBuku []models.BookItem
	for rows.Next() {
		err := rows.Scan(&tempBuku.BookID, &tempBuku.Judul, &tempBuku.Penulis, &tempBuku.Harga, &tempBuku.Diskon, &tempBuku.Cover)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		listBuku = append(listBuku, tempBuku)
	}
	defer rows.Close()

	totalItem := len(listBuku)
	if (totalItem/20 < pageNum) {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	// prepare response
	var cap int
	if pageNum*20 < totalItem {
		cap = pageNum*20
	} else {
		cap = totalItem
	}
	responseData := listBuku[(pageNum-1)*20:cap]
	

	w.Header().Set("Content-Type", "application/json")

	res := models.NewSuccessResponse("ok", responseData)
	helper.WriteToResponseBody(w, http.StatusOK, res)
}

func SearchController(w http.ResponseWriter, r *http.Request) {
	keyword := r.URL.Query().Get("q")
	if keyword == "" {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	pageParam := r.URL.Query().Get("pages")
	if pageParam == "" {
		pageParam = "1"
	}

	pageNum, err := strconv.Atoi(pageParam)
	if err != nil {
		response := models.NewErrorResponse("Gagal mendapatkan list buku", "Parameter yang diberikan invalid", "Invalid parameter")
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	rows, err := DB.Query("SELECT buku.bukuid, judul, penulis.nama, format_buku.harga, format_buku.diskon, cover FROM buku INNER JOIN penulis ON penulis.penulisID = buku.penulisID INNER JOIN format_buku ON format_buku.bukuID = buku.bukuID WHERE MATCH(buku.judul) AGAINST (? IN NATURAL LANGUAGE MODE) OR MATCH(penulis.nama) AGAINST (? IN NATURAL LANGUAGE MODE);", keyword, keyword)
	if err != nil {
		// Ada kesalahan dengan koneksi db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var tempBuku models.BookItem
	var listBuku []models.BookItem
	for rows.Next() {
		err := rows.Scan(&tempBuku.BookID, &tempBuku.Judul, &tempBuku.Penulis, &tempBuku.Harga, &tempBuku.Diskon, &tempBuku.Cover)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		listBuku = append(listBuku, tempBuku)
	}
	defer rows.Close()

	totalItem := len(listBuku)
	if ((pageNum - 1) * 20 > totalItem) { 

		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	// prepare response
	var cap int
	if pageNum*20 < totalItem {
		cap = pageNum*20
	} else {
		cap = totalItem
	}
	responseData := listBuku[(pageNum-1)*20:cap] //min(pageNum*20, len(listBuku))

	w.Header().Set("Content-Type", "application/json")

	res := models.NewSuccessResponse("ok", responseData)
	helper.WriteToResponseBody(w, http.StatusOK, res)
	
}

func BookDetailController(w http.ResponseWriter, r *http.Request) {
	bookIdParam := mux.Vars(r)["bukuID"]

	bookID, err := strconv.Atoi(bookIdParam)
	if err != nil {
		response := models.NewErrorResponse("Gagal mendapatkan detail buku", "Parameter yang diberikan invalid", "Invalid parameter")
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	var tempBuku models.BookDetail
	var tempFormat models.BookFormat
	rows, err := DB.Query("SELECT buku.bukuID, buku.judul, buku.deskripsi, buku.jml_halaman, buku.isbn, buku.berat, buku.lebar, penulis.nama, penerbit.nama, buku.cover, format.nama, format_buku.harga, format_buku.diskon FROM buku INNER JOIN penulis ON buku.penulisID = penulis.penulisID INNER JOIN penerbit ON buku.penerbitID = penerbit.penerbitID INNER JOIN format_buku ON format_buku.bukuID = buku.bukuID INNER JOIN format ON format_buku.formatID = format.formatID WHERE buku.bukuID = ?", bookID)

	if err != nil {
		// Ada kesalahan dengan koneksi db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if rows.Next() {
		err := rows.Scan(&tempBuku.BookID, &tempBuku.Judul, &tempBuku.Deskripsi, &tempBuku.Jml_hal, &tempBuku.Isbn, &tempBuku.Berat, &tempBuku.Lebar, &tempBuku.Penulis, &tempBuku.Penerbit, &tempBuku.Cover, &tempFormat.Format, &tempFormat.Harga, &tempFormat.Diskon)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		tempBuku.Format = append(tempBuku.Format, tempFormat)
	}

	for rows.Next() {
		err := rows.Scan(tempBuku.BookID, tempBuku.Judul, tempBuku.Deskripsi, tempBuku.Jml_hal, tempBuku.Isbn, tempBuku.Berat, tempBuku.Lebar, tempBuku.Penulis, tempBuku.Penerbit, tempBuku.Cover, &tempFormat.Format, &tempFormat.Harga, &tempFormat.Diskon)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		tempBuku.Format = append(tempBuku.Format, tempFormat)
	}

	w.Header().Set("Content-Type", "application/json")
	res := models.NewSuccessResponse("ok", tempBuku)
	helper.WriteToResponseBody(w, http.StatusOK, res)
}
