package com.adhiravishankar.citiesorganizer.repositories;

import com.adhiravishankar.citiesorganizer.models.City;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends MongoRepository<City, String> {

}
