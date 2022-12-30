package main

import (
	"github.com/gin-gonic/gin"
	"log"
)

func metros(c *gin.Context) {
	sql, _, _ := squirrel.Select("*").From("metros").ToSql()
	rows, err := database.Query(sql)
	if err != nil {
		log.Fatal(err)
	}

	var metroList []NullableMetro
	for rows.Next() {
		var metro NullableMetro
		err := rows.Scan(&metro.ID, &metro.Name, &metro.ExtendedName, &metro.Population, &metro.MetroSizeRank,
			&metro.FeaturedImage, &metro.Notes)
		if err != nil {
			log.Fatal(err)
		}
		metroList = append(metroList, metro)
	}

	c.JSON(200, convertNullableMetroList(metroList))
}

func getMetro(c *gin.Context) {
	var metro Metro
	row := squirrel.Select("*").Where(squirrel.Eq{"id": c.Param("metro")}).From("metros").
		RunWith(database).QueryRow()
	err := row.Scan(&metro.ID, &metro.Name, &metro.ExtendedName, &metro.Population, &metro.MetroSizeRank,
		&metro.FeaturedImage, &metro.Notes)
	if err != nil {
		log.Fatal(err)
	}

	detailedMetro := convertNullableDetailedMetroItem(metro)
	detailedMetro.Pics = internalGetMetroPics(c)
	detailedMetro.Cities = internalGetCitiesForMetro(c.Param("metro"))
	detailedMetro.Neighborhoods = internalGetNeighborhoodsForMetros(c.Param("metro"))
	c.JSON(200, detailedMetro)
}

func insertMetro(c *gin.Context) {
	result, err := squirrel.Insert("metros").
		Columns("name", "extended_name", "population", "metro_size_rank", "notes", "featured_image").
		Values(c.PostForm("name"), c.PostForm("extended_name"), c.PostForm("population"),
			c.PostForm("metro_size_rank"), c.PostForm("Notes"), c.PostForm("featured_image")).
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

func editMetro(c *gin.Context) {
	result, err := squirrel.Update("metros").Set("name", c.PostForm("name")).
		Set("extended_name", c.PostForm("extended_name")).
		Set("notes", c.PostForm("notes")).
		Set("population", c.PostForm("population")).
		Set("metro_size_rank", c.PostForm("metro_size_rank")).
		Set("featured_image", c.PostForm("featured_image")).
		Where(squirrel.Eq{"id": c.Param("metro")}).RunWith(database).Exec()
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

func deleteMetro(c *gin.Context) {
	result, err := squirrel.Delete("metros").Where(squirrel.Eq{"id": c.Param("metro")}).RunWith(database).
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

func internalGetCitiesForMetro(metro string) []City {
	rows, err := squirrel.Select("*").From("cities").Where(squirrel.Eq{"metro_id": metro}).RunWith(database).Query()
	if err != nil {
		log.Fatal(err)
	}

	var cityList []NullableCity
	for rows.Next() {
		var city NullableCity
		err := rows.Scan(&city.ID, &city.MetroID, &city.Name, &city.Population, &city.FeaturedImage, &city.Notes)
		if err != nil {
			log.Fatal(err)
		}
		cityList = append(cityList, city)
	}

	return convertNullableCityList(cityList)
}

func internalGetNeighborhoodsForMetros(metro string) []Neighborhood {
	rows, err := squirrel.Select("*").From("neighborhoods").Where(squirrel.Eq{"metro_id": metro}).
		RunWith(database).Query()
	if err != nil {
		log.Fatal(err)
	}

	var neighborhoodList []NullableNeighborhood
	for rows.Next() {
		var neighborhood NullableNeighborhood
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
