package main

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"log"
)

func addEmployer(c *gin.Context) {
	employersCollection := mongoDB.Collection("employers")

	employerID := uuid.New().String()

	_, employerPicFileURL := uploadPicForID(c, employerID)

	employer := Employer{
		ID:    employerID,
		Name:  c.PostForm("name"),
		Image: employerPicFileURL,
	}

	insertOneResult, err := employersCollection.InsertOne(c, employer)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, insertOneResult)
}

func addEmployerLocation(c *gin.Context) {
	employerLocationsCollection := mongoDB.Collection("employerLocations")

	employerLocationID := uuid.New().String()

	_, pictureURL := uploadPicForID(c, employerLocationID)

	employerLocation := EmployerLocation{
		ID:         employerLocationID,
		EmployerID: c.PostForm("employer_id"),
		Address:    c.PostForm("address"),
		MetroID:    c.PostForm("metro_id"),
		CityID:     c.PostForm("city_id"),
		Image:      pictureURL,
	}

	insertOneResult, err := employerLocationsCollection.InsertOne(c, employerLocation)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, insertOneResult)
}

func deleteEmployer(c *gin.Context) {
	employersCollection := mongoDB.Collection("employers")

	// Delete apartment
	_, err := employersCollection.DeleteOne(c, bson.D{{"_id", c.Param("employer")}})
	if err != nil {
		log.Fatal(err)
	}

	c.String(200, "success")
}

func deleteEmployerLocation(c *gin.Context) {
	employerLocationsCollection := mongoDB.Collection("employerLocations")

	// Delete apartment
	_, err := employerLocationsCollection.DeleteOne(c, bson.D{{"_id", c.Param("employer_location")}})
	if err != nil {
		log.Fatal(err)
	}

	c.String(200, "success")
}
