package main

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"strconv"
)

func cities(c *gin.Context) {
	citiesCollections := mongoDB.Collection("cities")

	cursor, err := citiesCollections.Find(c, bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var cities []City
	err = cursor.All(c, &cities)
	if err != nil {
		log.Fatal(err)
	}

	if cities == nil {
		cities = make([]City, 0)
	}

	c.JSON(200, &cities)
}

func createCity(c *gin.Context) {
	citiesCollections := mongoDB.Collection("cities")

	population, err := strconv.ParseInt(c.PostForm("population"), 10, 10)
	if err != nil {
		log.Fatal(err)
	}

	city := City{
		ID:            uuid.New().String(),
		MetroID:       c.PostForm("metro_id"),
		Name:          c.PostForm("name"),
		Population:    population,
		FeaturedImage: c.PostForm("featured_image"),
		Notes:         c.PostForm("notes"),
	}

	insertOneResult, err := citiesCollections.InsertOne(c, city)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, insertOneResult)
}

func readCity(c *gin.Context) {
	citiesCollections := mongoDB.Collection("cities")

	var result = citiesCollections.FindOne(c, bson.M{"_id": c.Param("city")})
	city := City{}
	err := result.Decode(&city)
	if err != nil {
		log.Fatal(err)
	}

	detailedCity := DetailedCity{
		City:          city,
		Pics:          internalListPics(c, c.Param("city")),
		Neighborhoods: internalNeighborhoodsForCity(c),
	}

	c.JSON(200, &detailedCity)
}

func updateCity(c *gin.Context) {
	citiesCollections := mongoDB.Collection("cities")

	population, err := strconv.ParseInt(c.PostForm("population"), 10, 10)
	if err != nil {
		log.Fatal(err)
	}

	city := City{
		ID:            c.Param("city"),
		MetroID:       c.PostForm("metro_id"),
		Name:          c.PostForm("name"),
		Population:    population,
		FeaturedImage: c.PostForm("featured_image"),
		Notes:         c.PostForm("notes"),
	}

	id, err := citiesCollections.UpdateByID(c, bson.D{{"_id", c.Param("city")}}, city)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, id)
}

func deleteCity(c *gin.Context) {
	citiesCollections := mongoDB.Collection("cities")
	neighborhoodsCollections := mongoDB.Collection("neighborhoods")

	// Delete neighborhoods associated with metro
	_, err := neighborhoodsCollections.DeleteMany(c, bson.D{{"city_id", c.Param("city")}})
	if err != nil {
		log.Fatal(err)
	}

	/// Delete metro
	_, err = citiesCollections.DeleteOne(c, bson.D{{"_id", c.Param("city")}})
	if err != nil {
		log.Fatal(err)
	}

	c.String(200, "success")
}

func internalCitiesForMetro(c *gin.Context) []City {
	citiesCollections := mongoDB.Collection("cities")

	cursor, err := citiesCollections.Find(c, bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var cities []City
	err = cursor.All(c, &cities)
	if err != nil {
		log.Fatal(err)
	}

	if cities == nil {
		cities = make([]City, 0)
	}

	return cities
}
