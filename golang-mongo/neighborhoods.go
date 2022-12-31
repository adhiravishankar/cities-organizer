package main

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"log"
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
	c.JSON(200, &neighborhoods)
}

func getNeighborhood(c *gin.Context) {
	neighborhoodsCollection := mongoDB.Collection("neighborhoods")

	var result = neighborhoodsCollection.FindOne(c, bson.M{"_id": c.Param("metro")})
	neighborhood := Neighborhood{}
	err := result.Decode(&neighborhood)
	if err != nil {
		log.Fatal(err)
	}

	detailedNeighborhood := DetailedNeighborhood{
		Neighborhood: neighborhood,
		Pics:         nil,
	}

	c.JSON(200, &detailedNeighborhood)
}

func insertNeighborhood(c *gin.Context) {
	result, err := squirrel.Insert("neighborhoods").
		Columns("name", "extended_name", "population", "featured_image", "notes").
		Values(c.PostForm("name"), c.PostForm("extended_name"), c.PostForm("population"), c.PostForm("featured_image"), c.PostForm("notes")).
		RunWith(database).Exec()
	if err != nil {
		log.Fatal(err)
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	if rowsAffected > 0 {
		c.String(200, "success")
	}
}

func editNeighborhood(c *gin.Context) {
	result, err := squirrel.Update("neighborhoods").Set("name", c.PostForm("name")).
		Set("extended_name", c.PostForm("extended_name")).
		Set("population", c.PostForm("population")).
		Set("featured_image", c.PostForm("featured_image")).
		Set("notes", c.PostForm("notes")).
		Where(squirrel.Eq{"id": c.Param("neighborhood")}).RunWith(database).Exec()
	if err != nil {
		log.Fatal(err)
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	if rowsAffected > 0 {
		c.String(200, "success")
	}
}

func deleteNeighborhood(c *gin.Context) {
	result, err := squirrel.Delete("neighborhoods").Where(squirrel.Eq{"id": c.Param("neighborhood")}).
		RunWith(database).Exec()
	if err != nil {
		log.Fatal(err)
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	if rowsAffected > 0 {
		c.String(200, "success")
	}
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
	return neighborhoods
}
