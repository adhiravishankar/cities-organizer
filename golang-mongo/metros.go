package main

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"strconv"
)

func listMetros(c *gin.Context) {
	metrosCollections := mongoDB.Collection("metros")
	cursor, err := metrosCollections.Find(c, bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var metros []Metro
	err = cursor.All(c, &metros)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, &metros)
}

func readMetro(c *gin.Context) {
	metrosCollections := mongoDB.Collection("metros")

	var result = metrosCollections.FindOne(c, bson.M{"_id": c.Param("metro")})
	metro := Metro{}
	err := result.Decode(&metro)
	if err != nil {
		log.Fatal(err)
	}

	detailedMetro := DetailedMetro{
		Metropolitan:  metro,
		Cities:        internalCitiesForMetro(c),
		Neighborhoods: internalNeighborhoodsForMetro(c),
	}

	c.JSON(200, &detailedMetro)
}

func createMetro(c *gin.Context) {
	metrosCollections := mongoDB.Collection("metros")

	population, err := strconv.ParseInt(c.PostForm("population"), 10, 10)
	if err != nil {
		log.Fatal(err)
	}

	metroSizeRank, err := strconv.ParseInt(c.PostForm("metro_size_rank"), 10, 10)
	if err != nil {
		log.Fatal(err)
	}

	metro := Metro{
		ID:            uuid.New().String(),
		Name:          c.PostForm("name"),
		ExtendedName:  c.PostForm("extended_name"),
		Population:    population,
		MetroSizeRank: metroSizeRank,
		Notes:         c.PostForm("notes"),
		FeaturedImage: c.PostForm("featured_image"),
	}
	insertOneResult, err := metrosCollections.InsertOne(c, metro)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, insertOneResult)
}

func updateMetro(c *gin.Context) {
	metrosCollections := mongoDB.Collection("metros")

	population, err := strconv.ParseInt(c.PostForm("population"), 10, 10)
	if err != nil {
		log.Fatal(err)
	}

	metroSizeRank, err := strconv.ParseInt(c.PostForm("metro_size_rank"), 10, 10)
	if err != nil {
		log.Fatal(err)
	}

	metro := Metro{
		ID:            c.Param("metro"),
		Name:          c.PostForm("name"),
		ExtendedName:  c.PostForm("extended_name"),
		Population:    population,
		MetroSizeRank: metroSizeRank,
		Notes:         c.PostForm("notes"),
		FeaturedImage: c.PostForm("featured_image"),
	}

	id, err := metrosCollections.UpdateByID(c, bson.D{{"_id", c.Param("metro")}}, metro)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, id)
}

func deleteMetro(c *gin.Context) {
	metrosCollections := mongoDB.Collection("metros")
	citiesCollections := mongoDB.Collection("cities")
	neighborhoodsCollections := mongoDB.Collection("neighborhoods")

	// Delete neighborhoods associated with metro
	_, err := neighborhoodsCollections.DeleteMany(c, bson.D{{"metro_id", c.Param("metro")}})
	if err != nil {
		log.Fatal(err)
	}

	// Delete cities associated with metro
	_, err = citiesCollections.DeleteMany(c, bson.D{{"metro_id", c.Param("metro")}})
	if err != nil {
		log.Fatal(err)
	}

	/// Delete metro
	_, err = metrosCollections.DeleteOne(c, bson.D{{"_id", c.Param("cologne")}})
	if err != nil {
		log.Fatal(err)
	}

	c.String(200, "success")
}
