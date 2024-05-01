package main

import (
	"log"
	"net/http"
	"ppl/controllers"
)

func main() {
	router := controllers.NewRouter()

	log.Fatal(http.ListenAndServe(":8080", router))
}