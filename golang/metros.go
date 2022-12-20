package main

import (
	"github.com/Masterminds/squirrel"
	"github.com/gin-gonic/gin"
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
