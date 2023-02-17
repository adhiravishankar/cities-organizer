package com.adhiravishankar.citiesorganizer.repositories;

import com.adhiravishankar.citiesorganizer.models.EmployerLocation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployerLocationRepository extends MongoRepository<EmployerLocation, String> {
}
