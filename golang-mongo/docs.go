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

func uploadDocs(c *gin.Context) {
	documentsCollection := mongoDB.Collection("documents")

	// Pull file from request
	file, err := c.FormFile("document")
	if err != nil {
		log.Fatal(err)
	}

	// Open file
	fileExt := filepath.Ext(file.Filename)
	documentFile, err := file.Open()
	if err != nil {
		log.Fatal(err)
	}

	// Upload file to S3
	documentFileName := uuid.New().String() + fileExt
	s3Object := s3.PutObjectInput{
		Body:          documentFile,
		Bucket:        aws.String(os.Getenv("GO_MONGO_S3_BUCKET")),
		Key:           aws.String(documentFileName),
		ContentLength: file.Size,
		ACL:           awstypes.ObjectCannedACL("public-read"),
	}
	_, err = s3Client.PutObject(c, &s3Object)
	if err != nil {
		log.Fatal(err)
	}

	documentURL := os.Getenv("GO_MONGO_document_URL") + documentFileName
	mongoDoc := Doc{
		AttributeID: c.PostForm("attribute"),
		ID:          documentFileName,
		URL:         documentURL,
	}
	insertOneResult, err := documentsCollection.InsertOne(c, mongoDoc)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, insertOneResult)
}

func internalListDocs(c *gin.Context, attribute string) []string {
	documentsCollection := mongoDB.Collection("documents")
	cursor, err := documentsCollection.Find(c, bson.D{{"attribute_id", attribute}})
	if err != nil {
		log.Fatal(err)
	}

	var docs []Doc
	err = cursor.All(c, &docs)
	if err != nil {
		log.Fatal(err)
	}

	var docURLs []string
	for _, doc := range docs {
		docURLs = append(docURLs, doc.URL)
	}

	if docURLs == nil {
		docURLs = make([]string, 0)
	}

	return docURLs
}
