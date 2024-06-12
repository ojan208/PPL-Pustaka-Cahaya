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
	"crypto/sha512"
	"encoding/hex"
	// "time"
	// "github.com/gorilla/mux"
	"strconv"
	"fmt"
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
		totalBookPrice += bookTemp.Harga - (bookTemp.Harga * bookTemp.Diskon / 100)
		// fmt.Println(bookTemp.Harga - (bookTemp.Harga * bookTemp.Diskon))
		// fmt.Println(totalBookPrice)
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
	// fmt.Println(transReq.GrossAmount)

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
		if (book.Diskon > 0) {
			items = append(items, models.ItemInfo{BukuID: "0", Harga: -1 * (book.Harga * book.Diskon / 100), Jumlah: 1, Judul: "Diskon"})
		}
	}

	var final models.Payload
	final.Items = items
	final.User = userReq
	final.Transaction = transReq
	
	payload, err := json.Marshal(final)
	// fmt.Println(string(payload))

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

type MidtransReq struct {
	OrderId				string		`json:"order_id"`			
	SignatureKey		string		`json:"signature_key"`
	StatusCode			string		`json:"status_code"`
	TransactionStatus	string		`json:"transaction_status"`
	FraudStatus			string		`json:"fraud_status"`
	GrossAmount			string		`json:"gross_amount"`
}

func handleAfterPayment(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Hai Midtrans :)")
	// time.Sleep(120 * time.Second) 
	var receivedReq MidtransReq
	err := json.NewDecoder(r.Body).Decode(&receivedReq)
	if err != nil {
		// Informasi akun tidak sesuai ekspektasi (Password < 8 char, tidak mengisi email/nama)
		response := models.NewErrorResponse("Bad Request", "Informasi Akun tidak sesuai dengan ketentuan", err.Error())
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}
	fmt.Println("Hai Midtrans :)")
	// orderId, err := strconv.Atoi(receivedReq.OrderId)
	// var GrossAmount int
	// var userID int
	fmt.Println(receivedReq)
	// rows, err := DB.Query("SELECT totalHarga, userID FROM orders WHERE orderId = ?", orderId)
	// if rows.Next() {
	// 	err := rows.Scan(&GrossAmount, &userID)
	// 	if err != nil {
	// 		http.Error(w, err.Error(), http.StatusNotFound)
	// 		return
	// 	}	
	// }

	serverKey := "SB-Mid-server-jVdnOj1gvosN0zYrCXDmNTZC"
	// sha_512 := sha512.New()
	hash := sha512.Sum512([]byte(receivedReq.OrderId+receivedReq.StatusCode+receivedReq.GrossAmount+serverKey))
	hashedLocal := hash[:]
	// signatureKeyHash = sha512.Sum512([receivedReq.SignatureKey])
	receivedHashBytes, err := hex.DecodeString(receivedReq.SignatureKey)
	if err != nil {
		// Ada kesalahan dengan koneksi db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Println(bytes.Equal(hashedLocal, receivedHashBytes))
	if (bytes.Equal(hash[:], receivedHashBytes)) {
		fmt.Println("Duar masuk if")
		statusPembayaran := ""
		if (receivedReq.TransactionStatus == "capture"){
			if (receivedReq.FraudStatus == "accept"){
				response := models.NewSuccessResponseNoData("Status Pembayaran Berhasil Diverifikasi")
				helper.WriteToResponseBody(w, http.StatusCreated, &response)
				statusPembayaran = "PAYMENT SUCCESS"
				fmt.Println(statusPembayaran)
				// return
			}
		} else if (receivedReq.TransactionStatus == "settlement"){
			response := models.NewSuccessResponseNoData("Status Pembayaran Berhasil Diverifikasi")
			helper.WriteToResponseBody(w, http.StatusCreated, &response)
			statusPembayaran = "SETTLEMENT"
			fmt.Println(statusPembayaran)
			// return
		} else if (receivedReq.TransactionStatus == "cancel" ||
			receivedReq.TransactionStatus == "deny" ||
			receivedReq.TransactionStatus == "expire"){
			response := models.NewSuccessResponseNoData("Status Pembayaran Berhasil Diverifikasi")
			helper.WriteToResponseBody(w, http.StatusCreated, &response)
			statusPembayaran = "GAGAL DIBAYAR"
			fmt.Println(statusPembayaran)
			// return
		} else if (receivedReq.TransactionStatus == "pending"){
			response := models.NewSuccessResponseNoData("Status Pembayaran Berhasil Diverifikasi")
			helper.WriteToResponseBody(w, http.StatusCreated, &response)
			statusPembayaran = "PENDING"
			fmt.Println(statusPembayaran)
			// return
		}
		_, err = DB.Exec("UPDATE orders SET konfirmasi = ? WHERE orderid = ?", statusPembayaran, receivedReq.OrderId)
		if err != nil {
			// Ada kesalahan dengan koneksi db
			w.WriteHeader(http.StatusInternalServerError)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		return;
		
	} else {
		response := models.NewErrorResponse("500", "Gagal Verifikasi Pembayaran", "Invalid Signature Key")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}
	// sha_512.Sum(nil)
}