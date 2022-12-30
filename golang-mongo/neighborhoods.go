package main

import (
	"github.com/gin-gonic/gin"
	"log"
)

func neighborhoods(c *gin.Context) {
	rows, err := squirrel.Select("*").From("neighborhoods").RunWith(database).Query()
	if err != nil {
		log.Fatal(err)
	}

	var neighborhoodList []Neighborhood
	for rows.Next() {
		var neighborhood Neighborhood
		err := rows.Scan(&neighborhood.ID, &neighborhood.CityID, &neighborhood.MetroID, &neighborhood.Name,
			&neighborhood.FeaturedImage, &neighborhood.HighSchoolScore, &neighborhood.MiddleSchoolScore,
			&neighborhood.ElementarySchoolScore, &neighborhood.Address, &neighborhood.MinimumValue,
			&neighborhood.MaximumValue, &neighborhood.MinSqft, &neighborhood.MaxSqft, &neighborhood.Notes)
		if err != nil {
			log.Fatal(err)
		}
		neighborhoodList = append(neighborhoodList, neighborhood)
	}

	c.JSON(200, neighborhoodList)
}

func getNeighborhood(c *gin.Context) {
	var neighborhood Neighborhood
	row := squirrel.Select("*").
		Where(squirrel.Eq{"id": c.Param("neighborhood")}).From("neighborhoods").RunWith(database).QueryRow()

	err := row.Scan(&neighborhood.ID, &neighborhood.CityID, &neighborhood.MetroID, &neighborhood.Name,
		&neighborhood.FeaturedImage, &neighborhood.HighSchoolScore, &neighborhood.MiddleSchoolScore,
		&neighborhood.ElementarySchoolScore, &neighborhood.Address, &neighborhood.MinimumValue,
		&neighborhood.MaximumValue, &neighborhood.MinSqft, &neighborhood.MaxSqft, &neighborhood.Notes)

	if err != nil {
		log.Fatal(err)
	}

	newNeighborhood := convertNullableDetailedNeighborhoodItem(neighborhood)
	newNeighborhood.Pics = internalGetNeighborhoodPics(c)
	c.JSON(200, newNeighborhood)
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
