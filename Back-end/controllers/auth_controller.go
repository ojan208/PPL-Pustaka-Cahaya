package controllers

import (
	"golang.org/x/crypto/bcrypt"
	"encoding/json"
	"net/http"
	"ppl/models"
	"ppl/helper"
	"github.com/go-playground/validator/v10"
	"fmt"
)

func RegisterController(w http.ResponseWriter, r *http.Request) {
	var user models.User
	validate := validator.New()

	err := json.NewDecoder(r.Body).Decode(&user)
	fmt.Printf("%+v\n", user)

	err = validate.Struct(user)
	if err != nil {
		// Informasi akun tidak sesuai ekspektasi (Password < 8 char, tidak mengisi email/nama)
		response := models.NewErrorResponse("Bad Request", "Informasi Akun tidak sesuai dengan ketentuan", err.Error())
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	rows, err := DB.Query("SELECT email from user WHERE email = ?", user.Email)
	if err != nil {
		// Ada masalah dgn koneksi server dan db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if rows.Next() {
		// Email sudah kepakai
		response := models.NewErrorResponse("Bad Request", "Registration failed", "Email is already use")
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		// Ada kesalahan dengan penggunaan modul
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	user.Password = string(hashedPassword)

	fmt.Printf("%+v\n", user)
	_, err = DB.Exec("INSERT INTO user (nama, email, password) VALUES (?, ?, ?)", 
					user.Nama, user.Email, user.Password)
	if err != nil {
		// Ada kesalahan dengan koneksi db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rows, err = DB.Query("SELECT userID, role from user WHERE email = ?", user.Email)
	if err != nil {
		// Ada masalah dgn koneksi server dan db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	
	rows.Next()
	err = rows.Scan(&user.UserID, &user.Role)
	if err != nil {
	// Ada masalah dgn koneksi server dan db
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	registerResponse := models.RegisterResponse {
		UserId	: user.UserID,
		Email	: user.Email,
		Role 	: user.Role,
	}

	response := models.NewSuccessResponse("Registration Successful!", registerResponse)
	helper.WriteToResponseBody(w, http.StatusCreated, &response)
}

func RegisterControllerOAuth(w http.ResponseWriter, r *http.Request) {
	
}

func LoginController(w http.ResponseWriter, r *http.Request) {
	// ambil value dari body request
	// hash password yang diterima
	// query untuk melihat validasi
	// if valid, send token
	// if not, send warning
	// error checking every step of the way
}

func LoginControllerOAuth(w http.ResponseWriter, r *http.Request) {
	
}