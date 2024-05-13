package controllers

import (
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"encoding/json"
	"net/http"
	"ppl/models"
	"ppl/helper"
	"github.com/go-playground/validator/v10"
	"strconv"
	"time"
)

func GenerateToken(userID int) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		ExpiresAt: time.Now().Add(1 * time.Hour).Unix(),
		IssuedAt:  time.Now().Unix(),
		Subject:   strconv.Itoa(userID),
	})

	signedToken, err := token.SignedString(helper.SecretKey)
	if err != nil {
		return "", err
	}

	return signedToken, nil
}


func RegisterController(w http.ResponseWriter, r *http.Request) {
	var user models.User
	validate := validator.New()

	err := json.NewDecoder(r.Body).Decode(&user)

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
	var user models.User

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		response := models.NewErrorResponse("Invalid Request Payload", "Bad Request", err.Error())
		helper.WriteToResponseBody(w, http.StatusBadRequest, &response)
		return
	}

	var userDB models.User
	err = DB.QueryRow("SELECT userID, email, password FROM user WHERE email = ?", user.Email).Scan(&userDB.UserID, &userDB.Email, &userDB.Password)
	if err != nil {
		response := models.NewErrorResponse("Login Failed", "Unauthorized", "Invalid Email")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(userDB.Password), []byte(user.Password))
	if err != nil {
		response := models.NewErrorResponse("Login Failed", "Unauthorized", "Invalid Password")
		helper.WriteToResponseBody(w, http.StatusUnauthorized, &response)
		return
	}

	token, err := GenerateToken(userDB.UserID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	responseData := models.UserLogin{
		UserID: strconv.Itoa(userDB.UserID),
		Email: userDB.Email, 
		Token: token,
	}

	response := models.NewSuccessResponse("Login successful", responseData)
	helper.WriteToResponseBody(w, http.StatusOK, response)
}

func LoginControllerOAuth(w http.ResponseWriter, r *http.Request) {
	
}