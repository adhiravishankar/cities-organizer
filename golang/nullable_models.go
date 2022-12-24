package main

import "database/sql"

type NullableMetro struct {
	ID            int64
	Name          sql.NullString
	ExtendedName  sql.NullString
	Population    sql.NullInt64
	Notes         sql.NullString
	FeaturedImage sql.NullString
}

type NullableDetailedMetro struct {
	ID            int64
	Name          sql.NullString
	ExtendedName  sql.NullString
	Population    sql.NullInt64
	Notes         sql.NullString
	FeaturedImage sql.NullString
	Pics          []string
	Cities        []City
	Neighborhoods []Neighborhood
}

type NullableCity struct {
	ID            int64
	MetroID       sql.NullInt64
	Name          sql.NullString
	Population    sql.NullInt64
	FeaturedImage sql.NullString
}

type NullableDetailedCity struct {
	ID            int64
	MetroID       sql.NullInt64
	Name          sql.NullString
	Population    sql.NullInt64
	FeaturedImage sql.NullString
	Pics          []string
}

type NullableNeighborhood struct {
	ID                    int64
	CityID                sql.NullInt64
	MetroID               sql.NullInt64
	FeaturedImage         string
	Link                  string
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

type NullableDetailedNeighborhood struct {
	ID                    int64
	CityID                sql.NullInt64
	MetroID               sql.NullInt64
	FeaturedImage         string
	Link                  string
	Name                  string
	HighSchoolScore       int64
	MiddleSchoolScore     int64
	ElementarySchoolScore int64
	Address               string
	MinimumValue          string
	MaximumValue          string
	MinSqft               string
	MaxSqft               string
	Pics                  []string
}
