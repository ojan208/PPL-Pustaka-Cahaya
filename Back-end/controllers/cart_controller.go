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

type cartReq struct {
	BukuID 	[]int	`json:"bukuID"`
	Jumlah	int 	`json:"jumlah"`
}



func AddToCartController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal menambahkan buku ke dalam cart", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}

	var buku cartReq
	err = json.NewDecoder(r.Body).Decode(&buku)
	if err != nil {
		response := models.NewErrorResponse("Bad Request", "Format Request Tidak Sesuai", err.Error())
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	for _, bukuID := range buku.BukuID {
		_, err = DB.Exec("INSERT IGNORE INTO user_cart (userID, bukuID) VALUES (?, ?)", userID, bukuID)
		if err != nil {
			// Ada kesalahan dengan koneksi db
			w.WriteHeader(http.StatusInternalServerError)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	response := models.NewSuccessResponseNoData("Nambah buku ke dalam cart Successful!")
	helper.WriteToResponseBody(w, http.StatusCreated, &response)
}

func ReadCartController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal memperbarui alamat user", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}
	// judul, format, jumlah barang, berat, harga
	rows, err := DB.Query("SELECT buku.judul, format.nama, user_cart.jumlah, buku.berat, format_buku.harga FROM user_cart JOIN buku ON buku.bukuID = user_cart.bukuID JOIN format_buku ON buku.bukuID = format_buku.bukuID JOIN format ON format_buku.formatID = format.formatID WHERE user_cart.userID = ?", userID)
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

	res := models.NewSuccessResponse("Berhasil memasukan buku ke dalam cart", userCart)
	helper.WriteToResponseBody(w, http.StatusOK, res)
}

func ChangeAmountController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal mengganti jumlah buku", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}

	var buku cartReq
	err = json.NewDecoder(r.Body).Decode(&buku)
	if err != nil {
		response := models.NewErrorResponse("Bad Request", "Format Request Tidak Sesuai", err.Error())
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	if buku.Jumlah <= 0 {
		buku.Jumlah = 1
	}
	

	_, err = DB.Exec("UPDATE user_cart set jumlah = ? WHERE bukuID = ? AND userID = ?", buku.Jumlah, buku.BukuID[0], userID)
	if err != nil {
		// Ada masalah dgn koneksi server dan db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := models.NewSuccessResponseNoData("update jumlah buku dari cart Successful!")
	helper.WriteToResponseBody(w, http.StatusCreated, &response)
}

func DeleteFromCartController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal memperbarui alamat user", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}
	
	var bukuIDS cartReq
	err = json.NewDecoder(r.Body).Decode(&bukuIDS)
	if err != nil {
		response := models.NewErrorResponse("Bad Request", "Format Request Tidak Sesuai", err.Error())
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	for _, bukuID := range bukuIDS.BukuID {
		_, err := DB.Exec("DELETE FROM user_cart WHERE userID = ? AND bukuID = ?", userID, bukuID)
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

