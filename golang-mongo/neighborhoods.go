package main

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"strconv"
)

func neighborhoods(c *gin.Context) {
	neighborhoodsCollection := mongoDB.Collection("neighborhoods")
	cursor, err := neighborhoodsCollection.Find(c, bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var neighborhoods []Neighborhood
	err = cursor.All(c, &neighborhoods)
	if err != nil {
		log.Fatal(err)
	}

	if neighborhoods == nil {
		neighborhoods = make([]Neighborhood, 0)
	}

	c.JSON(200, &neighborhoods)
}

func readNeighborhood(c *gin.Context) {
	neighborhoodsCollection := mongoDB.Collection("neighborhoods")

	var result = neighborhoodsCollection.FindOne(c, bson.M{"_id": c.Param("neighborhood")})
	neighborhood := Neighborhood{}
	err := result.Decode(&neighborhood)
	if err != nil {
		log.Fatal(err)
	}

	detailedNeighborhood := DetailedNeighborhood{
		Neighborhood: neighborhood,
		Pics:         internalListPics(c, c.Param("neighborhood")),
	}

	c.JSON(200, &detailedNeighborhood)
}

func createNeighborhood(c *gin.Context) {
	neighborhoodCollection := mongoDB.Collection("neighborhoods")

	highSchoolScore, err := strconv.ParseInt(c.PostForm("high_school_score"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	middleSchoolScore, err := strconv.ParseInt(c.PostForm("middle_school_score"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	elementarySchoolScore, err := strconv.ParseInt(c.PostForm("elementary_school_score"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	minimumValue, err := strconv.ParseInt(c.PostForm("minimum_value"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	maximumValue, err := strconv.ParseInt(c.PostForm("maximum_value"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	minSqft, err := strconv.ParseInt(c.PostForm("min_sqft"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	maxSqft, err := strconv.ParseInt(c.PostForm("max_sqft"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	neighborhood := Neighborhood{
		ID:                    uuid.New().String(),
		CityID:                c.PostForm("city_id"),
		MetroID:               c.PostForm("metro_id"),
		FeaturedImage:         c.PostForm("featured_image"),
		Link:                  c.PostForm("link"),
		Name:                  c.PostForm("name"),
		HighSchoolScore:       highSchoolScore,
		MiddleSchoolScore:     middleSchoolScore,
		ElementarySchoolScore: elementarySchoolScore,
		Address:               c.PostForm("address"),
		MinimumValue:          minimumValue,
		MaximumValue:          maximumValue,
		MinSqft:               minSqft,
		MaxSqft:               maxSqft,
		Notes:                 c.PostForm("notes"),
	}

	insertOneResult, err := neighborhoodCollection.InsertOne(c, neighborhood)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, insertOneResult)
}

func updateNeighborhood(c *gin.Context) {
	neighborhoodCollection := mongoDB.Collection("neighborhoods")

	highSchoolScore, err := strconv.ParseInt(c.PostForm("high_school_score"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	middleSchoolScore, err := strconv.ParseInt(c.PostForm("middle_school_score"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	elementarySchoolScore, err := strconv.ParseInt(c.PostForm("elementary_school_score"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	minimumValue, err := strconv.ParseInt(c.PostForm("minimum_value"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	maximumValue, err := strconv.ParseInt(c.PostForm("maximum_value"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	minSqft, err := strconv.ParseInt(c.PostForm("min_sqft"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	maxSqft, err := strconv.ParseInt(c.PostForm("max_sqft"), 10, 64)
	if err != nil {
		log.Fatal(err)
	}

	neighborhood := Neighborhood{
		ID:                    c.Param("neighborhood"),
		CityID:                c.PostForm("city_id"),
		MetroID:               c.PostForm("metro_id"),
		FeaturedImage:         c.PostForm("featured_image"),
		Link:                  c.PostForm("link"),
		Name:                  c.PostForm("name"),
		HighSchoolScore:       highSchoolScore,
		MiddleSchoolScore:     middleSchoolScore,
		ElementarySchoolScore: elementarySchoolScore,
		Address:               c.PostForm("address"),
		MinimumValue:          minimumValue,
		MaximumValue:          maximumValue,
		MinSqft:               minSqft,
		MaxSqft:               maxSqft,
		Notes:                 c.PostForm("notes"),
	}

	id, err := neighborhoodCollection.UpdateByID(c, bson.D{{"_id", c.Param("neighborhood")}}, neighborhood)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, id)
}

func deleteNeighborhood(c *gin.Context) {
	neighborhoodsCollections := mongoDB.Collection("neighborhoods")

	/// Delete metro
	_, err := neighborhoodsCollections.DeleteOne(c, bson.D{{"_id", c.Param("neighborhood")}})
	if err != nil {
		log.Fatal(err)
	}

	c.String(200, "success")
}

func internalNeighborhoodsForMetro(c *gin.Context) []Neighborhood {
	neighborhoodsCollection := mongoDB.Collection("neighborhoods")
	cursor, err := neighborhoodsCollection.Find(c, bson.D{{"metro_id", c.Param("metro")}})
	if err != nil {
		log.Fatal(err)
	}

	var neighborhoods []Neighborhood
	err = cursor.All(c, &neighborhoods)
	if err != nil {
		log.Fatal(err)
	}

	if neighborhoods == nil {
		neighborhoods = make([]Neighborhood, 0)
	}

	return neighborhoods
}

func internalNeighborhoodsForCity(c *gin.Context) []Neighborhood {
	neighborhoodsCollection := mongoDB.Collection("neighborhoods")
	cursor, err := neighborhoodsCollection.Find(c, bson.D{{"city_id", c.Param("city")}})
	if err != nil {
		log.Fatal(err)
	}

	var neighborhoods []Neighborhood
	err = cursor.All(c, &neighborhoods)
	if err != nil {
		log.Fatal(err)
	}

	if neighborhoods == nil {
		neighborhoods = make([]Neighborhood, 0)
	}

	return neighborhoods
}
