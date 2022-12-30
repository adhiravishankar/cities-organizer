package main

import (
	"context"
	"github.com/Masterminds/squirrel"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	awstypes "github.com/aws/aws-sdk-go-v2/service/s3/types"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"log"
	"path/filepath"
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
	var metro NullableMetro
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

func addMetroPicture(c *gin.Context) {
	file, err := c.FormFile("picture")
	if err != nil {
		log.Fatal(err)
	}
	fileExt := filepath.Ext(file.Filename)
	pictureFile, err := file.Open()
	if err != nil {
		log.Fatal(err)
	}

	pictureFileName := "metros/" + uuid.New().String() + fileExt
	s3Object := s3.PutObjectInput{
		Body:          pictureFile,
		Bucket:        aws.String("cities-organizer-photos"),
		Key:           aws.String(pictureFileName),
		ContentLength: file.Size,
		ACL:           awstypes.ObjectCannedACL("public-read"),
	}
	_, err = s3Client.PutObject(context.TODO(), &s3Object)
	if err != nil {
		log.Fatal(err)
	}

	pictureURL := "https://d2oewc7nt2ih9r.cloudfront.net/" + pictureFileName
	result, err := squirrel.Insert("metro_pictures").Columns("metro_id", "picture_url").
		Values(c.Param("metro"), pictureURL).RunWith(database).Exec()
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

func getMetroPictures(c *gin.Context) {
	c.JSON(200, internalGetMetroPics(c))
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

func internalGetMetroPics(c *gin.Context) []string {
	rows, err := squirrel.Select("picture_url").From("metro_pictures").
		Where(squirrel.Eq{"metro_id": c.Param("metro")}).RunWith(database).Query()
	if err != nil {
		log.Fatal(err)
	}

	var picList []string
	for rows.Next() {
		var pic string
		err := rows.Scan(&pic)
		if err != nil {
			log.Fatal(err)
		}
		picList = append(picList, pic)
	}

	return picList
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
