struct Pic {
    id: str,
    attribute_id: str,
    url: str,
}

struct Neighborhood {
    id: str,
    city_id: str,
    metro_id: str,
    featured_image: str,
    link: str,
    name: str,
    high_school_score: u64,
    middle_school_score: u64,
    elementary_school_score: u64,
    address: str,
    minimum_value: u64,
    maximum_value: u64,
    min_sqft: u64,
    max_sqft: u64,
    notes: str,
}

struct DerivedNeighborhood {
    id: str,
    city_id: str,
    metro_id: str,
    featured_image: str,
    link: str,
    name: str,
    high_school_score: u64,
    middle_school_score: u64,
    elementary_school_score: u64,
    address: str,
    minimum_value: u64,
    maximum_value: u64,
    min_sqft: u64,
    max_sqft: u64,
    notes: str,


    scores: str,
    values_range: str,
    sqft_range: str,
}

struct DetailedNeighborhood {
    neighborhood: Neighborhood,
    pics: Vec<Pic>,
}

struct City {
    id: str,
    metro_id: u64,
    name: str,
    population: u64,
    featured_image: str,
    notes: str,
}

struct DetailedCity {
    city: City,
    pics: Vec<Pic>,
    neighborhoods: Vec<Neighborhood>,
}

struct Metro {
    id: str,
    name: str,
    extended_name: str,
    population: u64,
    metro_size_rank: u64,
    notes: str,
    featured_image: str,
}

struct DetailedMetro {
    metro: Metro,
    pics: Vec<Pic>,
    cities: Vec<City>,
    neighborhoods: Vec<Neighborhood>,
}
