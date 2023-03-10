package main

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	mongoOptions "go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net/http"
	"os"
	"time"
)

var mongoDB *mongo.Database
var s3Client *s3.Client

func main() {
	err := godotenv.Load("app.env")
	if err != nil {
		log.Fatal(err)
	}

	connectToMongo()
	connectToS3()

	// Creates a gin router with default middleware:
	// logger and recovery (crash-free) middleware
	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/about", about)

	// Metros CRUD API
	router.GET("/metros", listMetros)
	router.POST("/metros", createMetro)
	router.GET("/metros/:metro", readMetro)
	router.PUT("/metros/:metro", updateMetro)
	router.DELETE("/metros/:metro", deleteMetro)

	// Cities CRUD API
	router.GET("/cities", cities)
	router.POST("/cities", createCity)
	router.GET("/cities/:city", readCity)
	router.PUT("/cities/:city", updateCity)
	router.DELETE("/cities/:city", deleteCity)

	// Neighborhoods CRUD API
	router.GET("/neighborhoods", neighborhoods)
	router.POST("/neighborhoods", createNeighborhood)
	router.GET("/neighborhoods/:neighborhood", readNeighborhood)
	router.PUT("/neighborhoods/:neighborhood", updateNeighborhood)
	router.DELETE("/neighborhoods/:neighborhood", deleteNeighborhood)

	// Pics & Docs API
	router.POST("/upload-pics", uploadPics)
	router.POST("/upload-docs", uploadDocs)

	err = http.ListenAndServe(":"+os.Getenv("GO_MONGO_PORT"), router)
	if err != nil {
		log.Fatal(err)
	}
}

func connectToMongo() {
	apiOptions := mongoOptions.ServerAPI(mongoOptions.ServerAPIVersion1)
	clientOptions := mongoOptions.Client().ApplyURI(os.Getenv("GO_MONGO_MONGODB_URL")).SetServerAPIOptions(apiOptions)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database(os.Getenv("GO_MONGO_DB"))
	mongoDB = db
}

func connectToS3() {
	awsAccessKey := os.Getenv("GO_MONGO_AWS_ACCESS_KEY")
	awsAccessSecret := os.Getenv("GO_MONGO_AWS_ACCESS_SECRET")
	awsCredentials := credentials.NewStaticCredentialsProvider(awsAccessKey, awsAccessSecret, "")
	options := s3.Options{
		Region:      "us-east-2",
		Credentials: aws.NewCredentialsCache(awsCredentials),
	}

	s3Client = s3.New(options)
}

func about(c *gin.Context) {
	aboutMap := make(map[string]string)
	aboutMap["Language"] = "Go"
	aboutMap["Framework"] = "Gin"
	aboutMap["Database"] = "Mongo"
	aboutMap["Cloud"] = "AWS"
	c.JSON(200, aboutMap)
}
