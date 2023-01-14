package main

import (
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	awstypes "github.com/aws/aws-sdk-go-v2/service/s3/types"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"os"
	"path/filepath"
)

func uploadPics(c *gin.Context) {
	picturesCollection := mongoDB.Collection("pictures")

	// Pull file from request
	file, err := c.FormFile("picture")
	if err != nil {
		log.Fatal(err)
	}

	// Open file
	fileExt := filepath.Ext(file.Filename)
	pictureFile, err := file.Open()
	if err != nil {
		log.Fatal(err)
	}

	// Upload file to S3
	pictureFileName := uuid.New().String() + fileExt
	s3Object := s3.PutObjectInput{
		Body:          pictureFile,
		Bucket:        aws.String(os.Getenv("GO_MONGO_S3_BUCKET")),
		Key:           aws.String(pictureFileName),
		ContentLength: file.Size,
		ACL:           awstypes.ObjectCannedACL("public-read"),
	}
	_, err = s3Client.PutObject(c, &s3Object)
	if err != nil {
		log.Fatal(err)
	}

	pictureURL := os.Getenv("GO_MONGO_PICTURE_URL") + pictureFileName
	mongoPic := Pic{
		AttributeID: c.PostForm("attribute"),
		ID:          pictureFileName,
		URL:         pictureURL,
	}
	insertOneResult, err := picturesCollection.InsertOne(c, mongoPic)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, insertOneResult)
}

func internalListPics(c *gin.Context, attribute string) []string {
	picturesCollection := mongoDB.Collection("pictures")
	cursor, err := picturesCollection.Find(c, bson.D{{"attribute_id", attribute}})
	if err != nil {
		log.Fatal(err)
	}

	var pics []Pic
	err = cursor.All(c, &pics)
	if err != nil {
		log.Fatal(err)
	}

	var picURLs []string
	for _, pic := range pics {
		picURLs = append(picURLs, pic.URL)
	}

	if picURLs == nil {
		picURLs = make([]string, 0)
	}

	return picURLs
}
