package main

import (
	"github.com/Masterminds/squirrel"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"log"
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

	pictureFile, err := file.Open()
	if err != nil {
		log.Fatal(err)
	}

	pictureFileName := uuid.New().String()

	result, err := squirrel.Insert("metro_pictures").Columns("metro_id", "picture_url").
		Values(c.Param("metro")).RunWith(database).Exec()
	if err != nil {
		log.Fatal(err)
	}
	println(result)
}
