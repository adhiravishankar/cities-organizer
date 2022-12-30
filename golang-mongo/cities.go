package main

import (
	"github.com/gin-gonic/gin"
	"log"
)

func cities(c *gin.Context) {
	rows, err := squirrel.Select("*").From("cities").RunWith(database).Query()
	if err != nil {
		log.Fatal(err)
	}

	var cityList []City
	for rows.Next() {
		var city City
		err := rows.Scan(&city.ID, &city.MetroID, &city.Name, &city.Population, &city.FeaturedImage, &city.Notes)
		if err != nil {
			log.Fatal(err)
		}
		cityList = append(cityList, city)
	}

	c.JSON(200, convertNullableCityList(cityList))
}

func insertCity(c *gin.Context) {
	result, err := squirrel.Insert("cities").
		Columns("name", "metro_id", "population", "featured_image", "notes").
		Values(c.PostForm("name"), c.PostForm("metro_id"), c.PostForm("population"), c.PostForm("featured_image"), c.PostForm("notes")).
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

func getCity(c *gin.Context) {
	var city City
	row := squirrel.Select("*").Where(squirrel.Eq{"id": c.Param("city")}).From("cities").
		RunWith(database).QueryRow()
	err := row.Scan(&city.ID, &city.MetroID, &city.Name, &city.Population, &city.FeaturedImage, &city.Notes)
	if err != nil {
		log.Fatal(err)
	}

	newCity := convertNullableDetailedCityItem(city)
	newCity.Pics = internalGetCityPics(c)
	newCity.Neighborhoods = internalGetNeighborhoodsForCities(c.Param("city"))
	c.JSON(200, newCity)
}

func editCity(c *gin.Context) {
	result, err := squirrel.Update("cities").Set("name", c.PostForm("name")).
		Set("extended_name", c.PostForm("extended_name")).Set("population", c.PostForm("population")).
		Set("notes", c.PostForm("notes")).Where(squirrel.Eq{"id": c.Param("city")}).RunWith(database).Exec()
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

func deleteCity(c *gin.Context) {
	result, err := squirrel.Delete("cities").Where(squirrel.Eq{"id": c.Param("city")}).RunWith(database).
		Exec()
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

func internalGetNeighborhoodsForCities(city string) []Neighborhood {
	rows, err := squirrel.Select("*").From("neighborhoods").Where(squirrel.Eq{"city_id": city}).
		RunWith(database).Query()
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

	return convertNullableNeighborhoodList(neighborhoodList)
}
