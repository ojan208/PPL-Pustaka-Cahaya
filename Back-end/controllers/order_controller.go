package controllers

import (
	"encoding/json"
	"net/http"
	"ppl/models"
	"ppl/helper"
	"database/sql"
	"bytes"
	"encoding/base64"
	"io"
	// "github.com/gorilla/mux"
	"strconv"
	// "fmt"
)

func MakeOrderToken(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal menambahkan buku ke dalam cart", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}

	rows, err := DB.Query("SELECT a.bukuid, a.jumlah, b.harga, b.diskon, c.berat, c.judul, d.nama, d.email, d.noTelp FROM user_cart a JOIN format_buku b ON b.bukuID = a.bukuID JOIN buku c ON c.bukuID = a.bukuID JOIN user d ON d.userID = a.userID WHERE a.userID = ?", userID)
	if err != nil {
		// Ada masalah dgn koneksi server dan db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var bookItems []models.CartRead
	var bookTemp models.CartRead
	var user models.Profile
	var noTelp sql.NullString
	totalBookPrice := 0 // buat ngitung total harga buku
	for rows.Next() {
		err := rows.Scan(&bookTemp.BukuID, &bookTemp.Jumlah, &bookTemp.Harga, &bookTemp.Diskon, &bookTemp.Berat, &bookTemp.Judul, &user.Nama, &user.Email, &noTelp)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}	
		totalBookPrice += bookTemp.Harga - (bookTemp.Harga * bookTemp.Diskon)
		bookItems = append(bookItems, bookTemp)
	}
	if noTelp.Valid {
		user.NoTelp = noTelp.String
	}
	finalPrice := totalBookPrice + 0 // ini nanti kalau ada tambahan harga kurir, skrg mah sama dulu

	// push info ke tabel orders dan order detail + dapetin order id nya
	catch, err := DB.Exec("INSERT INTO orders (tglBeli, totalHargaBuku, totalHarga, userId) VALUES (NOW(), ?, ?, ?)", totalBookPrice, finalPrice, userID)
	if err != nil {
		// Ada masalah dgn koneksi server dan db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	orderId, err := catch.LastInsertId()
	if err != nil {
		// Ada masalah dgn koneksi server dan db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for _, buku := range bookItems {
		_, err := DB.Exec("INSERT INTO order_details (orderID, userID, bukuID, jumlahBeli, harga, diskon) VALUES (?, ?, ?, ?, ?, ?)", orderId, userID, buku.BukuID, buku.Jumlah, buku.Harga, buku.Diskon)
		if err != nil {
			// Ada masalah dgn koneksi server dan db
			w.WriteHeader(http.StatusInternalServerError)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	// Bikin request ke midtrans pake hal yg udah tau + dpt response dr request
	midtransUrl := "https://app.sandbox.midtrans.com/snap/v1/transactions"

	var transReq models.TransactionInfo
	transReq.OrderID = strconv.Itoa(int(orderId))
	transReq.GrossAmount = finalPrice

	var userReq models.UserInfo
	userReq.Nama = user.Nama
	userReq.LastName = ""
	userReq.Email = user.Email
	userReq.NoTelp = user.NoTelp

	var items []models.ItemInfo
	for _, book := range bookItems {
		var temp models.ItemInfo
		temp.BukuID = strconv.Itoa(int(book.BukuID))
		temp.Harga = book.Harga
		temp.Jumlah = book.Jumlah
		if len(book.Judul) > 50 {
			temp.Judul = book.Judul[:50]
		} else {
			temp.Judul = book.Judul
		}
		items = append(items, temp)
	}

	var final models.Payload
	final.Items = items
	final.User = userReq
	final.Transaction = transReq
	
	payload, err := json.Marshal(final)

	tokenReq, _ := http.NewRequest("POST", midtransUrl, bytes.NewReader(payload))

	serverKey := "SB-Mid-server-jVdnOj1gvosN0zYrCXDmNTZC"
	// encodedServerKey := "TWlkLXNlcnZlci1kN09vTF91ZjYtRFNmWTE3TXV1N09aanY="
	encodedServerKey := base64.StdEncoding.EncodeToString([]byte(serverKey))

	tokenReq.Header.Add("accept", "application/json")
	tokenReq.Header.Add("content-type", "application/json")
	tokenReq.Header.Add("Authorization", "Basic "+encodedServerKey)

	tokenRes, _ := http.DefaultClient.Do(tokenReq)


	defer tokenRes.Body.Close()
	body, _ := io.ReadAll(tokenRes.Body)

	// respon dengan link redirect dari response midtrans

	w.Header().Set("Content-Type", "application/json")
	res := models.NewSuccessResponse("Berhasil membuat order", string(body))
	helper.WriteToResponseBody(w, http.StatusOK, res)
}