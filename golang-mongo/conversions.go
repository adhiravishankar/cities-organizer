package main

func convertNullableMetroList(metros []NullableMetro) []Metro {
	var newMetros []Metro
	for _, metro := range metros {
		newMetros = append(newMetros, convertNullableMetroItem(metro))
	}
	return newMetros
}

func convertNullableMetroItem(metro NullableMetro) Metro {
	var newMetro Metro
	newMetro.ID = metro.ID
	newMetro.Name = metro.Name.String
	newMetro.FeaturedImage = metro.FeaturedImage.String
	newMetro.Population = metro.Population.Int64
	newMetro.MetroSizeRank = metro.MetroSizeRank.Int64
	newMetro.ExtendedName = metro.ExtendedName.String
	newMetro.Notes = metro.Notes.String
	return newMetro
}

func convertNullableDetailedMetroItem(metro NullableMetro) DetailedMetro {
	var newMetro DetailedMetro
	newMetro.ID = metro.ID
	newMetro.Name = metro.Name.String
	newMetro.FeaturedImage = metro.FeaturedImage.String
	newMetro.Population = metro.Population.Int64
	newMetro.MetroSizeRank = metro.MetroSizeRank.Int64
	newMetro.ExtendedName = metro.ExtendedName.String
	newMetro.Notes = metro.Notes.String
	return newMetro
}

func convertNullableCityList(cities []NullableCity) []City {
	var newCities []City
	for _, city := range cities {
		newCities = append(newCities, convertNullableCityItem(city))
	}
	return newCities
}

func convertNullableCityItem(city NullableCity) City {
	var newCity City
	newCity.ID = city.ID
	newCity.MetroID = city.MetroID.Int64
	newCity.Name = city.Name.String
	newCity.FeaturedImage = city.FeaturedImage.String
	newCity.Population = city.Population.Int64
	newCity.Notes = city.Notes.String
	return newCity
}

func convertNullableDetailedCityItem(city NullableCity) DetailedCity {
	var newCity DetailedCity
	newCity.ID = city.ID
	newCity.MetroID = city.MetroID.Int64
	newCity.Name = city.Name.String
	newCity.FeaturedImage = city.FeaturedImage.String
	newCity.Population = city.Population.Int64
	newCity.Notes = city.Notes.String
	return newCity
}

func convertNullableNeighborhoodList(neighborhoods []NullableNeighborhood) []Neighborhood {
	var newNeighborhoods []Neighborhood
	for _, neighborhood := range neighborhoods {
		newNeighborhoods = append(newNeighborhoods, convertNullableNeighborhoodItem(neighborhood))
	}
	return newNeighborhoods
}

func convertNullableNeighborhoodItem(neighborhood NullableNeighborhood) Neighborhood {
	var newNeighborhood Neighborhood
	newNeighborhood.ID = neighborhood.ID
	newNeighborhood.CityID = neighborhood.CityID.Int64
	newNeighborhood.MetroID = neighborhood.MetroID.Int64
	newNeighborhood.FeaturedImage = neighborhood.FeaturedImage.String
	newNeighborhood.Link = neighborhood.Link.String
	newNeighborhood.Name = neighborhood.Name.String
	newNeighborhood.ElementarySchoolScore = neighborhood.ElementarySchoolScore.Int64
	newNeighborhood.MiddleSchoolScore = neighborhood.MiddleSchoolScore.Int64
	newNeighborhood.HighSchoolScore = neighborhood.HighSchoolScore.Int64
	newNeighborhood.Address = neighborhood.Address.String
	newNeighborhood.MinimumValue = neighborhood.MinimumValue.Int64
	newNeighborhood.MaximumValue = neighborhood.MaximumValue.Int64
	newNeighborhood.MinSqft = neighborhood.MinSqft.Int64
	newNeighborhood.MaxSqft = neighborhood.MaxSqft.Int64
	newNeighborhood.Notes = neighborhood.Notes.String
	return newNeighborhood
}

func convertNullableDetailedNeighborhoodItem(neighborhood NullableNeighborhood) DetailedNeighborhood {
	var newNeighborhood DetailedNeighborhood
	newNeighborhood.ID = neighborhood.ID
	newNeighborhood.CityID = neighborhood.CityID.Int64
	newNeighborhood.MetroID = neighborhood.MetroID.Int64
	newNeighborhood.FeaturedImage = neighborhood.FeaturedImage.String
	newNeighborhood.Link = neighborhood.Link.String
	newNeighborhood.Name = neighborhood.Name.String
	newNeighborhood.ElementarySchoolScore = neighborhood.ElementarySchoolScore.Int64
	newNeighborhood.MiddleSchoolScore = neighborhood.MiddleSchoolScore.Int64
	newNeighborhood.HighSchoolScore = neighborhood.HighSchoolScore.Int64
	newNeighborhood.Address = neighborhood.Address.String
	newNeighborhood.MinimumValue = neighborhood.MinimumValue.Int64
	newNeighborhood.MaximumValue = neighborhood.MaximumValue.Int64
	newNeighborhood.MinSqft = neighborhood.MinSqft.Int64
	newNeighborhood.MaxSqft = neighborhood.MaxSqft.Int64
	newNeighborhood.Notes = neighborhood.Notes.String
	return newNeighborhood
}
