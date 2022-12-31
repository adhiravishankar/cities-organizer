package main

type Metro struct {
	ID            string `bson:"_id"`
	Name          string `bson:"name,omitempty"`
	ExtendedName  string `bson:"extended_name,omitempty"`
	Population    int64  `bson:"population,omitempty"`
	MetroSizeRank int64  `bson:"metro_size_rank,omitempty"`
	Notes         string `bson:"notes,omitempty"`
	FeaturedImage string `bson:"featured_image,omitempty"`
}

type DetailedMetro struct {
	Metropolitan  Metro
	Pics          []string
	Cities        []City
	Neighborhoods []Neighborhood
}

type City struct {
	ID            string
	MetroID       string
	Name          string
	Population    int64
	FeaturedImage string
	Notes         string
}

type DetailedCity struct {
	City          City
	Pics          []string
	Neighborhoods []Neighborhood
}

type Neighborhood struct {
	ID                    string
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
	Notes                 string
}

type DetailedNeighborhood struct {
	Neighborhood Neighborhood
	Pics         []string
}

type Pic struct {
	AttributeID string
	ID          string
	URL         string
}
