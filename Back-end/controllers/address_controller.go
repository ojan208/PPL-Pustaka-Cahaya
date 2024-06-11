package controllers

import (
	"encoding/json"
	"net/http"
	"ppl/models"
	"ppl/helper"
	"github.com/gorilla/mux"
	"github.com/go-playground/validator/v10"
	// "fmt"
	"strconv"
)

func CreateAddressController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal memperbarui alamat user", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}
	var alamatBaru models.Alamat

	err = json.NewDecoder(r.Body).Decode(&alamatBaru)
	err = helper.Validate.Struct(alamatBaru)
	if err != nil {
		// Informasi akun tidak sesuai ekspektasi (Password < 8 char, tidak mengisi email/nama)
		response := models.NewErrorResponse("Bad Request", "Informasi Akun tidak sesuai dengan ketentuan", err.Error())
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	_, err = DB.Exec("INSERT INTO user_alamat (nama, provinsi, kabupaten_kota, kecamatan, kelurahan, alamat, userID) VALUES (?, ?, ?, ?, ?, ?, ?)", alamatBaru.Nama, alamatBaru.Provinsi, alamatBaru.Kabupaten, alamatBaru.Kecamatan, alamatBaru.Kelurahan, alamatBaru.AlamatFull, userID)
	if err != nil {
		// Ada kesalahan dengan koneksi db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := models.NewSuccessResponseNoData("Nambah Alamat Successful!")
	helper.WriteToResponseBody(w, http.StatusCreated, response)
}

func GetAllAddressController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal memperbarui alamat user", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}

	var alamat []models.Alamat
	var tempAlamat models.Alamat
	rows, err := DB.Query("SELECT alamatID, nama, provinsi, kabupaten_kota, kecamatan, kelurahan, alamat FROM user_alamat WHERE userID = ?", userID)
	for rows.Next() {
		err := rows.Scan(&tempAlamat.AlamatID, &tempAlamat.Nama, &tempAlamat.Provinsi, &tempAlamat.Kabupaten, &tempAlamat.Kecamatan, &tempAlamat.Kelurahan, &tempAlamat.AlamatFull)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}	
		alamat = append(alamat, tempAlamat)
	}
	defer rows.Close()

	w.Header().Set("Content-Type", "application/json")

	res := models.NewSuccessResponse("ok", alamat)
	helper.WriteToResponseBody(w, http.StatusOK, res)
}

func GetAddressController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal mengambil alamat user", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}

	param := mux.Vars(r)["alamatID"]
	alamatID, err := strconv.Atoi(param)
	if err != nil {
		response := models.NewErrorResponse("Gagal mendapatkan alamat user", "Parameter yang diberikan invalid", "Invalid parameter")
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	var alamat models.Alamat
	alamat.AlamatID = alamatID

	rows, err := DB.Query("SELECT nama, provinsi, kabupaten_kota, kecamatan, kelurahan, alamat FROM user_alamat WHERE alamatID = ? AND userID = ?", alamat.AlamatID, userID)
	if rows.Next() {
		err := rows.Scan(&alamat.Nama, &alamat.Provinsi, &alamat.Kabupaten, &alamat.Kecamatan, &alamat.Kelurahan, &alamat.AlamatFull)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}	
	}

	w.Header().Set("Content-Type", "application/json")

	res := models.NewSuccessResponse("ok", alamat)
	helper.WriteToResponseBody(w, http.StatusOK, res)
}

func UpdateAddressController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal memperbarui alamat user", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}

	param := mux.Vars(r)["alamatID"]
	validate := validator.New()
	var alamatBaru models.Alamat

	alamatID, err := strconv.Atoi(param)
	err = validate.Struct(alamatBaru)
	if err != nil {
		response := models.NewErrorResponse("Gagal memperbarui alamat user", "Parameter yang diberikan invalid", "Invalid parameter")
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}
	alamatBaru.AlamatID = alamatID

	err = json.NewDecoder(r.Body).Decode(&alamatBaru)
	if err != nil {
		response := models.NewErrorResponse("Bad Request", "Informasi Alamat tidak sesuai dengan ketentuan", err.Error())
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	_, err = DB.Exec("UPDATE user_alamat SET nama = ?, provinsi = ?, kabupaten_kota = ?, kecamatan = ?, kelurahan = ?, alamat = ? WHERE alamatID = ? AND userID = ?", alamatBaru.Nama, alamatBaru.Provinsi, alamatBaru.Kabupaten, alamatBaru.Kecamatan, alamatBaru.Kelurahan, alamatBaru.AlamatFull, alamatBaru.AlamatID, userID)
	if err != nil {
		// Ada kesalahan dengan koneksi db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := models.NewSuccessResponseNoData("Profile Update Successful!")
	helper.WriteToResponseBody(w, http.StatusCreated, &response)
}

func DeleteAddressController(w http.ResponseWriter, r *http.Request) {
	param := mux.Vars(r)["alamatID"]
	addressID, err := strconv.Atoi(param)
	if err != nil {
		response := models.NewErrorResponse("Gagal menghapus alamat user", "Parameter yang diberikan invalid", "Invalid parameter")
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	_, err = DB.Exec("DELETE FROM user_alamat WHERE alamatID = ?", addressID)
	if err != nil {
		// Ada kesalahan dengan koneksi db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := models.NewSuccessResponseNoData("Address Deletion Successful!")
	helper.WriteToResponseBody(w, http.StatusCreated, &response)	
}
