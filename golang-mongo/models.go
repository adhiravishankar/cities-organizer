package main

type Metro struct {
	ID            string `bson:"_id"`
	Name          string `bson:"name,omitempty"`
	ExtendedName  string `bson:"extended_name,omitempty"`
	SmallName     string `bson:"small_name,omitempty"`
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
	ID            string `bson:"_id"`
	MetroID       string `bson:"metro_id"`
	Name          string `bson:"name"`
	Population    int64  `bson:"population"`
	FeaturedImage string `bson:"featured_image"`
	Notes         string `bson:"notes"`
}

type DetailedCity struct {
	City          City
	Pics          []string
	Neighborhoods []Neighborhood
}

type Neighborhood struct {
	ID                    string `bson:"_id"`
	CityID                string `bson:"city_id"`
	MetroID               string `bson:"metro_id"`
	FeaturedImage         string `bson:"featured_image"`
	Link                  string `bson:"link"`
	Name                  string `bson:"name"`
	HighSchoolScore       int64  `bson:"high_school_score"`
	MiddleSchoolScore     int64  `bson:"middle_school_score"`
	ElementarySchoolScore int64  `bson:"elementary_school_score"`
	Address               string `bson:"address"`
	MinimumValue          int64  `bson:"minimum_value"`
	MaximumValue          int64  `bson:"maximum_value"`
	MinSqft               int64  `bson:"min_sqft"`
	MaxSqft               int64  `bson:"max_sqft"`
	Notes                 string `bson:"notes"`
}

type DerivedNeighborhood struct {
	ID                    string `bson:"_id"`
	CityID                string `bson:"city_id"`
	MetroID               string `bson:"metro_id"`
	FeaturedImage         string `bson:"featured_image"`
	Link                  string `bson:"link"`
	Name                  string `bson:"name"`
	HighSchoolScore       int64  `bson:"high_school_score"`
	MiddleSchoolScore     int64  `bson:"middle_school_score"`
	ElementarySchoolScore int64  `bson:"elementary_school_score"`
	Address               string `bson:"address"`
	MinimumValue          int64  `bson:"minimum_value"`
	MaximumValue          int64  `bson:"maximum_value"`
	MinSqft               int64  `bson:"min_sqft"`
	MaxSqft               int64  `bson:"max_sqft"`
	Notes                 string `bson:"notes"`

	Scores      string
	ValuesRange string
	SqFtRange   string
}

type DetailedNeighborhood struct {
	Neighborhood Neighborhood
	Pics         []string
}

type Pic struct {
	ID          string `bson:"_id"`
	AttributeID string `bson:"attribute_id"`
	URL         string `bson:"url"`
}
