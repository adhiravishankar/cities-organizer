package main

import (
	"github.com/Masterminds/squirrel"
	"github.com/gin-gonic/gin"
	"log"
)

type Neighborhood struct {
	ID                    int64
	CityID                int64
	Name                  string
	HighSchoolScore       int64
	MiddleSchoolScore     int64
	ElementarySchoolScore int64
	Address               string
	MinimumValue          string
	MaximumValue          string
	MinSqft               string
	MaxSqft               string
}

func neighborhoods(c *gin.Context) {
	sql, _, _ := squirrel.Select("*").From("neighborhoods").ToSql()
	rows, err := database.Query(sql)
	if err != nil {
		log.Fatal(err)
	}

	var neighborhoodList []Neighborhood
	for rows.Next() {
		var neighborhood Neighborhood
		err := rows.Scan(&neighborhood.ID, &neighborhood.CityID, &neighborhood.Name, &neighborhood.HighSchoolScore,
			&neighborhood.MiddleSchoolScore, &neighborhood.ElementarySchoolScore, &neighborhood.Address,
			&neighborhood.MinimumValue, &neighborhood.MaximumValue, &neighborhood.MinSqft, &neighborhood.MaxSqft)
		if err != nil {
			log.Fatal(err)
		}
		neighborhoodList = append(neighborhoodList, neighborhood)
	}

	c.JSON(200, neighborhoodList)
}
