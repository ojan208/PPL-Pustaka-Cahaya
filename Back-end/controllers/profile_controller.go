package controllers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"ppl/models"
	"ppl/helper"
	"github.com/go-playground/validator/v10"
	"fmt"
)


func GetProfileController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	
	if err != nil {
		response := models.NewErrorResponse("Gagal memperbarui alamat user", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}
	var userProfile models.Profile
	var username sql.NullString
	var noTelp sql.NullString
	var tglLahir sql.NullTime
	var jk sql.NullInt64
	
	rows, err := DB.Query("SELECT nama, jk, tglLahir, noTelp, email, username FROM user WHERE userID = ?", userID)

	if err != nil {
		// Ada kesalahan dengan koneksi db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	
	if rows.Next() {
		err := rows.Scan(&userProfile.Nama, &jk, &tglLahir, &noTelp, &userProfile.Email, &username)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}	
	}
	if username.Valid {
		userProfile.Username = username.String
	} else {
		userProfile.Username = ""
	}

	if noTelp.Valid {
		userProfile.NoTelp = noTelp.String
	} else {
		userProfile.NoTelp = ""
	}

	if tglLahir.Valid {
		userProfile.TglLahir = tglLahir.Time.Format("2006-01-02")
		// userProfile.TglLahir = tglLahir.Time.String()
	} else {
		userProfile.TglLahir = ""
	}

	if jk.Valid {
		userProfile.Jk = int(jk.Int64)
	} else {
		userProfile.Jk = 0
	}
		
	// w.Header().Set("Content-Type", "application/json")

	res := models.NewSuccessResponse("ok", userProfile)
	helper.WriteToResponseBody(w, http.StatusOK, res)
}

func UpdateProfileController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal memperbarui alamat user", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}

	var input models.Profile
	validate := validator.New()

	err = json.NewDecoder(r.Body).Decode(&input)
	err = validate.Struct(input)
	if err != nil {
		// Informasi akun tidak sesuai ekspektasi (Password < 8 char, tidak mengisi email/nama)
		response := models.NewErrorResponse("Bad Request", "Informasi Akun tidak sesuai dengan ketentuan", err.Error())
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}
	fmt.Printf("STR_TO_DATE(%s, '%Y-%m-%d')", input.TglLahir)

	_, err = DB.Exec("UPDATE user SET username = ?, nama = ?, jk = ?, noTelp = ?, tglLahir = STR_TO_DATE(?, '%Y-%m-%d') WHERE userID = ?", input.Username, input.Nama, input.Jk, input.NoTelp, input.TglLahir, userID)
	if err != nil {
		// Ada kesalahan dengan koneksi db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := models.NewSuccessResponseNoData("Profile Update Successful!")
	helper.WriteToResponseBody(w, http.StatusCreated, &response)
}

func DeleteProfileController(w http.ResponseWriter, r *http.Request) {
	userID, err := helper.GetUserIDFromToken(r)
	if err != nil {
		response := models.NewErrorResponse("Gagal memperbarui alamat user", "Unauthorized", "Invalid Token")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}

	_, err = DB.Exec("DELETE FROM user WHERE userID = ?", userID)
	if err != nil {
		// Ada kesalahan dengan koneksi db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := models.NewSuccessResponseNoData("Profile Deletion Successful!")
	helper.WriteToResponseBody(w, http.StatusCreated, &response)	
}
