package main

import (
	"github.com/Masterminds/squirrel"
	"github.com/gin-gonic/gin"
	"log"
)

type City struct {
	ID         int64
	MetroID    int64
	Name       string
	Population int64
}

func cities(c *gin.Context) {
	sql, _, _ := squirrel.Select("*").From("cities").ToSql()
	rows, err := database.Query(sql)
	if err != nil {
		log.Fatal(err)
	}

	var cityList []City
	for rows.Next() {
		var city City
		err := rows.Scan(&city.ID, &city.MetroID, &city.Name, &city.Population)
		if err != nil {
			log.Fatal(err)
		}
		cityList = append(cityList, city)
	}

	c.JSON(200, cityList)
}
