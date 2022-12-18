package main

import (
	"github.com/gin-gonic/gin"
	"log"
)

func main() {
	// Creates a gin router with default middleware:
	// logger and recovery (crash-free) middleware
	router := gin.Default()

	err := router.Run()
	if err != nil {
		log.Fatal(err)
	}
}
