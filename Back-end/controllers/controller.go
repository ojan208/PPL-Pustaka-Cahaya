package controllers

import (
	// "github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
	"ppl/connect"
	// "net/http"
	// "strconv"
	// "time"
)

var DB, err = connect.ConnectDB()

func NewRouter() *mux.Router {
	router := mux.NewRouter()

	// authMiddleware := middleware.AuthMiddleware

	// router.Handle("/words", authMiddleware(http.HandlerFunc(GetAllWordsHandler))).Methods("GET").Queries("page", "{page}")
	// router.Handle("/words/{WordID}", authMiddleware(http.HandlerFunc(GetWordDetailHandler))).Methods("GET")
	// // router.HandleFunc("/words", GetAllWordsHandler).Methods("GET").Queries("page", "{page}") // for testing in postman
	// // router.HandleFunc("/words/{WordID}", GetWordDetailHandler).Methods("GET") //for testing in postman
	router.HandleFunc("/register", RegisterController).Methods("POST")
	// router.HandleFunc("/login", LoginHandler).Methods("POST")
	// router.Handle("/user", authMiddleware(http.HandlerFunc(GetUserHandler))).Methods("GET")
	// //router.Handle("/user/{id}", authMiddleware(http.HandlerFunc(EditUserHandler))).Methods("PUT")
	// router.Handle("/user/update", authMiddleware(http.HandlerFunc(UpdateCurrentUserHandler))).Methods("PUT")
	// router.Handle("/words/{WordID}", authMiddleware(http.HandlerFunc(GradingHandler))).Methods("POST")

	return router
}
