package main

type Metro struct {
	ID            int64
	Name          string
	ExtendedName  string
	Population    int64
	Notes         string
	FeaturedImage string
}

type DetailedMetro struct {
	ID            int64
	Name          string
	ExtendedName  string
	Population    int64
	Notes         string
	FeaturedImage string
	Pics          []string
	Cities        []City
	Neighborhoods []Neighborhood
}

type City struct {
	ID            int64
	MetroID       int64
	Name          string
	Population    int64
	FeaturedImage string
}

type DetailedCity struct {
	ID            int64
	MetroID       int64
	Name          string
	Population    int64
	FeaturedImage string
	Pics          []string
	Neighborhoods []Neighborhood
}

type Neighborhood struct {
	ID                    int64
	CityID                int64
	MetroID               int64
	FeaturedImage         string
	Link                  string
	Name                  string
	HighSchoolScore       int64
	MiddleSchoolScore     int64
	ElementarySchoolScore int64
	Address               string
	MinimumValue          int64
	MaximumValue          int64
	MinSqft               int64
	MaxSqft               int64
}

type DetailedNeighborhood struct {
	ID                    int64
	CityID                int64
	MetroID               int64
	FeaturedImage         string
	Link                  string
	Name                  string
	HighSchoolScore       int64
	MiddleSchoolScore     int64
	ElementarySchoolScore int64
	Address               string
	MinimumValue          int64
	MaximumValue          int64
	MinSqft               int64
	MaxSqft               int64
	Pics                  []string
}
