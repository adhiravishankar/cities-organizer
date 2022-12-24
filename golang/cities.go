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

func cities(c *gin.Context) {
	rows, err := squirrel.Select("*").From("cities").RunWith(database).Query()
	if err != nil {
		log.Fatal(err)
	}

	var cityList []NullableCity
	for rows.Next() {
		var city NullableCity
		err := rows.Scan(&city.ID, &city.MetroID, &city.Name, &city.Population, &city.FeaturedImage)
		if err != nil {
			log.Fatal(err)
		}
		cityList = append(cityList, city)
	}

	c.JSON(200, convertNullableCityList(cityList))
}

func insertCity(c *gin.Context) {
	result, err := squirrel.Insert("cities").
		Columns("name", "metro_id", "population", "featured_image").
		Values(c.PostForm("name"), c.PostForm("metro_id"), c.PostForm("population"), c.PostForm("featured_image")).
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
	var city NullableCity
	row := squirrel.Select("*").Where(squirrel.Eq{"id": c.Param("city")}).From("cities").
		RunWith(database).QueryRow()
	err := row.Scan(&city.ID, &city.MetroID, &city.Name, &city.Population, &city.FeaturedImage)
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
		Where(squirrel.Eq{"id": c.Param("city")}).RunWith(database).Exec()
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

func addCityPicture(c *gin.Context) {
	file, err := c.FormFile("picture")
	if err != nil {
		log.Fatal(err)
	}
	fileExt := filepath.Ext(file.Filename)
	pictureFile, err := file.Open()
	if err != nil {
		log.Fatal(err)
	}

	pictureFileName := "cities/" + uuid.New().String() + fileExt
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
	result, err := squirrel.Insert("city_pictures").Columns("city_id", "picture_url").
		Values(c.Param("city"), pictureURL).RunWith(database).Exec()
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

func getCityPictures(c *gin.Context) {
	c.JSON(200, internalGetCityPics(c))
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

func internalGetCityPics(c *gin.Context) []string {
	rows, err := squirrel.Select("picture_url").From("city_pictures").
		Where(squirrel.Eq{"city_id": c.Param("city")}).RunWith(database).Query()
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

func internalGetNeighborhoodsForCities(city string) []Neighborhood {
	rows, err := squirrel.Select("*").From("neighborhoods").Where(squirrel.Eq{"city_id": city}).
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
			&neighborhood.MaximumValue, &neighborhood.MinSqft, &neighborhood.MaxSqft)
		if err != nil {
			log.Fatal(err)
		}
		neighborhoodList = append(neighborhoodList, neighborhood)
	}

	return convertNullableNeighborhoodList(neighborhoodList)
}
