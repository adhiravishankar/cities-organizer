package main

import "database/sql"

type NullableMetro struct {
	ID            int64
	Name          sql.NullString
	ExtendedName  sql.NullString
	Population    sql.NullInt64
	MetroSizeRank sql.NullInt64
	Notes         sql.NullString
	FeaturedImage sql.NullString
}

type NullableCity struct {
	ID            int64
	MetroID       sql.NullInt64
	Name          sql.NullString
	Population    sql.NullInt64
	FeaturedImage sql.NullString
}

type NullableNeighborhood struct {
	ID                    int64
	CityID                sql.NullInt64
	MetroID               sql.NullInt64
	FeaturedImage         sql.NullString
	Link                  sql.NullString
	Name                  sql.NullString
	HighSchoolScore       sql.NullInt64
	MiddleSchoolScore     sql.NullInt64
	ElementarySchoolScore sql.NullInt64
	Address               sql.NullString
	MinimumValue          sql.NullInt64
	MaximumValue          sql.NullInt64
	MinSqft               sql.NullInt64
	MaxSqft               sql.NullInt64
}
