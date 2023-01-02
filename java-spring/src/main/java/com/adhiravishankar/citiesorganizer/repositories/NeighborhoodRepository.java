package com.adhiravishankar.citiesorganizer.repositories;

import com.adhiravishankar.citiesorganizer.models.Neighborhood;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NeighborhoodRepository extends MongoRepository<Neighborhood, String> {

}
