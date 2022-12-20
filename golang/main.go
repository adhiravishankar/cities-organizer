package main

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"log"
	"os"
)

var database *sql.DB

func main() {
	err := godotenv.Load()

	sqlDsnStruct := mysql.Config{
		User:                 os.Getenv("MYSQL_USER"),
		Passwd:               os.Getenv("MYSQL_PASSWORD"),
		Net:                  "tcp",
		Addr:                 os.Getenv("MYSQL_ADDRESS"),
		DBName:               os.Getenv("MYSQL_DB"),
		AllowNativePasswords: true,
	}

	db, err := sql.Open("mysql", sqlDsnStruct.FormatDSN())
	database = db
	if err != nil {
		log.Fatal(err)
	}

	// Creates a gin router with default middleware:
	// logger and recovery (crash-free) middleware
	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/hello/:name", login)
	router.POST("/login", login)
	router.POST("/signup", signup)
	router.GET("/metros", metros)
	router.GET("/cities", cities)
	router.GET("/neighborhoods", neighborhoods)

	err = router.Run(":7001")
	if err != nil {
		log.Fatal(err)
	}

	err = db.Close()
	if err != nil {
		log.Fatal(err)
	}

}
