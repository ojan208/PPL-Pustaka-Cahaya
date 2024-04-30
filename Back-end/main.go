package main

import (
	"log"
	"net/http"
	"ppl/handlers"
)

func main() {
	router := handlers.NewRouter()

	log.Fatal(http.ListenAndServe(":8080", router))
}