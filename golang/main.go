package main

import (
	"database/sql"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"log"
	"os"
)

var database *sql.DB
var s3Client *s3.Client

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

	awsAccessKey := os.Getenv("AWS_ACCESS_KEY")
	awsAccessSecret := os.Getenv("AWS_ACCESS_SECRET")
	awsCredentials := credentials.NewStaticCredentialsProvider(awsAccessKey, awsAccessSecret, "")
	options := s3.Options{
		Region:      "us-east-2",
		Credentials: aws.NewCredentialsCache(awsCredentials),
	}

	s3Client = s3.New(options)
	
	// Metros CRUD API
	router.GET("/metros", metros)
	router.POST("/metros", insertMetro)
	router.GET("/metros/:metro", getMetro)
	router.GET("/metros/:metro/pics", getMetroPictures)
	router.POST("/metros/:metro/upload", addMetroPicture)
	router.PUT("/metros/:metro", editMetro)
	router.DELETE("/metros/:metro", deleteMetro)

	// Cities CRUD API
	router.GET("/cities", cities)
	router.POST("/cities", insertCity)
	router.GET("/cities/:city", getCity)
	router.GET("/cities/:city/pics", getCityPictures)
	router.POST("/cities/:city/upload", addCityPicture)
	router.PUT("/cities/:city", editCity)
	router.DELETE("/cities/:city", deleteCity)

	// Neighborhoods CRUD API
	router.GET("/neighborhoods", neighborhoods)
	router.POST("/neighborhoods", insertNeighborhood)
	router.GET("/neighborhoods/:neighborhood", getNeighborhood)
	router.GET("/neighborhoods/:neighborhood/pics", getNeighborhoodPictures)
	router.POST("/neighborhoods/:neighborhood/upload", addNeighborhoodPicture)
	router.PUT("/neighborhoods/:neighborhood", editNeighborhood)
	router.DELETE("/neighborhoods/:neighborhood", deleteNeighborhood)

	err = router.Run(":7001")
	if err != nil {
		log.Fatal(err)
	}

	err = db.Close()
	if err != nil {
		log.Fatal(err)
	}

}
