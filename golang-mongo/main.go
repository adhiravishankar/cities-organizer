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
	"os"
	"time"
)

var mongoDB *mongo.Database
var s3Client *s3.Client

func main() {
	err := godotenv.Load()

	connectToMongo()
	connectToS3()

	// Creates a gin router with default middleware:
	// logger and recovery (crash-free) middleware
	router := gin.Default()
	router.Use(CORSMiddleware())

	router.POST("/login", login)
	router.POST("/signup", signup)

	// Metros CRUD API
	router.GET("/metros", metros)
	router.POST("/metros", insertMetro)
	router.GET("/metros/:metro", getMetro)
	router.PUT("/metros/:metro", editMetro)
	router.DELETE("/metros/:metro", deleteMetro)

	// Cities CRUD API
	router.GET("/cities", cities)
	router.POST("/cities", insertCity)
	router.GET("/cities/:city", getCity)
	router.PUT("/cities/:city", editCity)
	router.DELETE("/cities/:city", deleteCity)

	// Neighborhoods CRUD API
	router.GET("/neighborhoods", neighborhoods)
	router.POST("/neighborhoods", insertNeighborhood)
	router.GET("/neighborhoods/:neighborhood", getNeighborhood)
	router.PUT("/neighborhoods/:neighborhood", editNeighborhood)
	router.DELETE("/neighborhoods/:neighborhood", deleteNeighborhood)

	// Pics API
	router.POST("/pics", uploadPics)

	err = router.Run(":7003")
	if err != nil {
		log.Fatal(err)
	}
}

func connectToMongo() {
	apiOptions := mongoOptions.ServerAPI(mongoOptions.ServerAPIVersion1)
	clientOptions := mongoOptions.Client().ApplyURI(os.Getenv("MONGODB_URL")).SetServerAPIOptions(apiOptions)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database("cities-golang")
	mongoDB = db
}

func connectToS3() {
	awsAccessKey := os.Getenv("AWS_ACCESS_KEY")
	awsAccessSecret := os.Getenv("AWS_ACCESS_SECRET")
	awsCredentials := credentials.NewStaticCredentialsProvider(awsAccessKey, awsAccessSecret, "")
	options := s3.Options{
		Region:      "us-east-2",
		Credentials: aws.NewCredentialsCache(awsCredentials),
	}

	s3Client = s3.New(options)
}
