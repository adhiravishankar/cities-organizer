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

func neighborhoods(c *gin.Context) {
	rows, err := squirrel.Select("*").From("neighborhoods").RunWith(database).Query()
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

	c.JSON(200, neighborhoodList)
}

func getNeighborhood(c *gin.Context) {
	var neighborhood NullableNeighborhood
	row := squirrel.Select("*").
		Where(squirrel.Eq{"id": c.Param("neighborhood")}).From("neighborhoods").RunWith(database).QueryRow()

	err := row.Scan(&neighborhood.ID, &neighborhood.CityID, &neighborhood.MetroID, &neighborhood.Name,
		&neighborhood.FeaturedImage, &neighborhood.HighSchoolScore, &neighborhood.MiddleSchoolScore,
		&neighborhood.ElementarySchoolScore, &neighborhood.Address, &neighborhood.MinimumValue,
		&neighborhood.MaximumValue, &neighborhood.MinSqft, &neighborhood.MaxSqft)

	if err != nil {
		log.Fatal(err)
	}

	newNeighborhood := convertNullableDetailedNeighborhoodItem(neighborhood)
	newNeighborhood.Pics = internalGetNeighborhoodPics(c)
	c.JSON(200, newNeighborhood)
}

func insertNeighborhood(c *gin.Context) {
	result, err := squirrel.Insert("neighborhoods").
		Columns("name", "extended_name", "population", "featured_image").
		Values(c.PostForm("name"), c.PostForm("extended_name"), c.PostForm("population"), c.PostForm("featured_image")).
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

func addNeighborhoodPicture(c *gin.Context) {
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
	result, err := squirrel.Insert("neighborhood_pictures").Columns("neighborhood_id", "picture_url").
		Values(c.Param("neighborhood"), pictureURL).RunWith(database).Exec()
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

func getNeighborhoodPictures(c *gin.Context) {
	c.JSON(200, internalGetNeighborhoodPics(c))
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

func internalGetNeighborhoodPics(c *gin.Context) []string {
	rows, err := squirrel.Select("picture_url").From("neighborhood_pictures").
		Where(squirrel.Eq{"neighborhood_id": c.Param("neighborhood")}).RunWith(database).Query()
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
