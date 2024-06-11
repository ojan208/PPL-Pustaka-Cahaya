package controllers

import (
	// "github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
	"ppl/connect"
	"github.com/rs/cors"
	"net/http"
	// "strconv"
	// "time"
)

var DB, err = connect.ConnectDB()

func NewRouter() http.Handler {
	router := mux.NewRouter()

	// Authentication 
	router.HandleFunc("/auth/register", RegisterController).Methods("POST")
	router.HandleFunc("/auth/login", LoginController).Methods("POST")
	router.HandleFunc("/auth/{provider}/callback", OauthStart).Methods("GET")
	router.HandleFunc("/auth/{provider}", OauthAuto).Methods("GET")
	router.HandleFunc("/auth/logout/{provider}", OauthLogout).Methods("GET")

	// Home page
	router.HandleFunc("/index", HomepageController).Methods("GET")

	// Books Catalog + search
	router.HandleFunc("/buku", BooksCatalogController).Queries("pages", "{pages}").Methods("GET")
	router.HandleFunc("/buku", BooksCatalogController).Methods("GET")
	router.HandleFunc("/buku/{bukuID}", BookDetailController).Methods("GET")
	router.HandleFunc("/buku", SearchController).Queries("q", "{q}", "page", "{page}").Methods("GET")
	router.HandleFunc("/buku", SearchController).Queries("q", "{q}").Methods("GET")

	// Profile 
	router.HandleFunc("/user", GetProfileController).Methods("GET")
	router.HandleFunc("/user", UpdateProfileController).Methods("PUT")
	router.HandleFunc("/user", DeleteProfileController).Methods("DELETE")

	// Address
	router.HandleFunc("/user/address", GetAllAddressController).Methods("GET")
	router.HandleFunc("/user/address/{alamatID}", GetAddressController).Methods("GET")
	router.HandleFunc("/user/address", CreateAddressController).Methods("POST")
	router.HandleFunc("/user/address/{alamatID}", UpdateAddressController).Methods("PUT")
	router.HandleFunc("/user/address/{alamatID}", DeleteAddressController).Methods("DELETE")

	// Cart
	router.HandleFunc("/user/cart", ReadCartController).Methods("GET")
	router.HandleFunc("/user/cart/", AddToCartController).Methods("POST")
	router.HandleFunc("/user/cart/", ChangeAmountController).Methods("PUT")
	router.HandleFunc("/user/cart", DeleteFromCartController).Methods("DELETE")

	router.HandleFunc("/user/order", MakeOrderToken).Methods("GET")

	handler := cors.Default().Handler(router)
	return handler
}
