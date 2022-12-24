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
	newMetro.Notes = metro.Notes.String
	newMetro.ExtendedName = metro.ExtendedName.String
	return newMetro
}

func convertNullableNeighborhoodItem(neighborhood NullableNeighborhood) Neighborhood {
	var newNeighborhood Neighborhood
	newNeighborhood.ID = neighborhood.ID
	newNeighborhood.CityID = neighborhood.CityID.Int64
	newNeighborhood.Name = neighborhood.Name.String
	newNeighborhood.FeaturedImage = neighborhood.FeaturedImage.String
	newNeighborhood.MetroID = neighborhood.MetroID.Int64
	newNeighborhood.Address = neighborhood.Address.String
	newNeighborhood.ElementarySchoolScore = neighborhood.ElementarySchoolScore.Int64
	newNeighborhood.MiddleSchoolScore = neighborhood.MiddleSchoolScore.Int64
	newNeighborhood.HighSchoolScore = neighborhood.HighSchoolScore.Int64
	return newNeighborhood
}
