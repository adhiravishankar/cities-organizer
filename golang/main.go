package main

import (
	"context"
	"database/sql"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
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

	// Using the SDK's default configuration, loading additional config
	// and credentials values from the environment variables, shared
	// credentials, and shared configuration files
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-east-2"))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	// Using the Config value, create the DynamoDB client
	s3Client := s3.NewFromConfig(cfg)

	// Creates a gin router with default middleware:
	// logger and recovery (crash-free) middleware
	router := gin.Default()
	router.Use(CORSMiddleware())

	router.POST("/login", login)
	router.POST("/signup", signup)
	router.GET("/metros", metros)
	router.GET("/metros/:metro", getMetro)
	router.POST("/metros/:metro/upload", addMetroPicture)
	router.PUT("/metros/:metro", editMetro)
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
