package main

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"strconv"
)

func apartments(c *gin.Context) {
	apartmentsCollection := mongoDB.Collection("apartments")
	cursor, err := apartmentsCollection.Find(c, bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var apartments []Apartment
	err = cursor.All(c, &apartments)
	if err != nil {
		log.Fatal(err)
	}

	if apartments == nil {
		apartments = make([]Apartment, 0)
	}

	c.JSON(200, &apartments)
}

func readApartment(c *gin.Context) {
	apartmentsCollection := mongoDB.Collection("apartments")

	var result = apartmentsCollection.FindOne(c, bson.M{"_id": c.Param("apartment")})
	apartment := Apartment{}
	err := result.Decode(&apartment)
	if err != nil {
		log.Fatal(err)
	}

	detailedApartment := DetailedApartment{
		Apartment: apartment,
		Docs:      internalListDocs(c, c.Param("neighborhood")),
		Pics:      internalListPics(c, c.Param("neighborhood")),
	}

	c.JSON(200, &detailedApartment)
}

func createApartment(c *gin.Context) {
	apartmentsCollection := mongoDB.Collection("apartments")

	rent, err := strconv.ParseInt(c.PostForm("rent"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	sqft, err := strconv.ParseInt(c.PostForm("sqft"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	apartment := Apartment{
		ID:            uuid.New().String(),
		CityID:        c.PostForm("city_id"),
		MetroID:       c.PostForm("metro_id"),
		FeaturedImage: c.PostForm("featured_image"),
		Link:          c.PostForm("link"),
		Name:          c.PostForm("name"),
		Address:       c.PostForm("address"),
		Rent:          rent,
		Sqft:          sqft,
		Notes:         c.PostForm("notes"),
	}

	insertOneResult, err := apartmentsCollection.InsertOne(c, apartment)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, insertOneResult)
}

func updateApartment(c *gin.Context) {
	apartmentsCollection := mongoDB.Collection("apartments")

	rent, err := strconv.ParseInt(c.PostForm("rent"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	sqft, err := strconv.ParseInt(c.PostForm("sqft"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	apartment := Apartment{
		ID:            uuid.New().String(),
		CityID:        c.PostForm("city_id"),
		MetroID:       c.PostForm("metro_id"),
		FeaturedImage: c.PostForm("featured_image"),
		Link:          c.PostForm("link"),
		Name:          c.PostForm("name"),
		Address:       c.PostForm("address"),
		Rent:          rent,
		Sqft:          sqft,
		Notes:         c.PostForm("notes"),
	}

	neighborhoodID := bson.D{{"_id", c.Param("apartment")}}
	id, err := apartmentsCollection.ReplaceOne(c, neighborhoodID, apartment)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, id)
}

func deleteApartment(c *gin.Context) {
	apartmentsCollection := mongoDB.Collection("apartments")

	// Delete apartment
	_, err := apartmentsCollection.DeleteOne(c, bson.D{{"_id", c.Param("apartment")}})
	if err != nil {
		log.Fatal(err)
	}

	c.String(200, "success")
}
