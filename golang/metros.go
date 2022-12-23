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

type Metro struct {
	ID            int64
	Name          string
	ExtendedName  string
	Population    int64
	Notes         string
	FeaturedImage string
}

func metros(c *gin.Context) {
	sql, _, _ := squirrel.Select("*").From("metros").ToSql()
	rows, err := database.Query(sql)
	if err != nil {
		log.Fatal(err)
	}

	var metroList []Metro
	for rows.Next() {
		var metro Metro
		err := rows.Scan(&metro.ID, &metro.Name, &metro.ExtendedName, &metro.Population, &metro.Notes, &metro.FeaturedImage)
		if err != nil {
			log.Fatal(err)
		}
		metroList = append(metroList, metro)
	}

	c.JSON(200, metroList)
}

func getMetro(c *gin.Context) {
	var metro Metro
	row := squirrel.Select("*").Where(squirrel.Eq{"id": c.Param("metro")}).From("metros").RunWith(database).QueryRow()
	err := row.Scan(&metro.ID, &metro.Name, &metro.ExtendedName, &metro.Population, &metro.Notes, &metro.FeaturedImage)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, metro)
}

func editMetro(c *gin.Context) {
	result, err := squirrel.Update("metros").Set("name", c.PostForm("name")).
		Set("extended_name", c.PostForm("extended_name")).Set("population", c.PostForm("population")).
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

	c.JSON(200, picList)
}
