package controllers

import (
	"encoding/json"
	"net/http"
	"ppl/models"
	"ppl/helper"
	// "github.com/gorilla/mux"
	// "strconv"
	// "fmt"
)

// type cartReq struct {
// 	BukuID 	[]int	`json:"bukuID"`
// 	Jumlah	int 	`json:"jumlah"`
// }

func AddToWishlistController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal menambahkan buku ke dalam wishlist", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}

	var buku models.CartReq
	err = json.NewDecoder(r.Body).Decode(&buku)
	if err != nil {
		response := models.NewErrorResponse("Bad Request", "Format Request Tidak Sesuai", err.Error())
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	for _, bukuID := range buku.BukuID {
		_, err = DB.Exec("INSERT IGNORE INTO user_wishlist (userID, bukuID) VALUES (?, ?)", userID, bukuID)
		if err != nil {
			// Ada kesalahan dengan koneksi db
			w.WriteHeader(http.StatusInternalServerError)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	response := models.NewSuccessResponseNoData("Menambah buku ke dalam wishlist Successful!")
	helper.WriteToResponseBody(w, http.StatusCreated, &response)
}

func ReadWishlistController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal membaca wishlist user", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}
	// judul, format, jumlah barang, berat, harga
	rows, err := DB.Query("SELECT a.bukuid, a.judul, b.nama, c.harga, c.diskon, a.cover FROM user_wishlist JOIN buku a ON user_wishlist.bukuid = a.bukuid JOIN penulis b ON b.penulisid = a.penulisid JOIN format_buku c ON c.bukuid = a.bukuid WHERE user_wishlist.userID = ?", userID)
	if err != nil {
		// Ada masalah dgn koneksi server dan db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var userCart []models.CartRead
	var temp models.CartRead
	for rows.Next() {
		err := rows.Scan(&temp.Judul, &temp.Format, &temp.Jumlah, &temp.Berat, &temp.Harga)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}	
		userCart = append(userCart, temp)
	}
	
	defer rows.Close()
	
	w.Header().Set("Content-Type", "application/json")

	res := models.NewSuccessResponse("Berhasil memasukan buku ke dalam wishlist", userCart)
	helper.WriteToResponseBody(w, http.StatusOK, res)
}

func DeleteFromWishlistController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal memperbarui alamat user", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}
	
	var bukuIDS models.CartReq
	err = json.NewDecoder(r.Body).Decode(&bukuIDS)
	if err != nil {
		response := models.NewErrorResponse("Bad Request", "Format Request Tidak Sesuai", err.Error())
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	for _, bukuID := range bukuIDS.BukuID {
		_, err := DB.Exec("DELETE FROM user_wishlist WHERE userID = ? AND bukuID = ?", userID, bukuID)
		if err != nil {
			// Ada masalah dgn koneksi server dan db
			w.WriteHeader(http.StatusInternalServerError)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	response := models.NewSuccessResponseNoData("Delete buku dari cart Successful!")
	helper.WriteToResponseBody(w, http.StatusCreated, &response)
}

