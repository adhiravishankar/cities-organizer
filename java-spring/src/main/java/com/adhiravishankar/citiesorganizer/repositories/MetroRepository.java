package com.adhiravishankar.citiesorganizer.repositories;

import com.adhiravishankar.citiesorganizer.models.Metro;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MetroRepository extends MongoRepository<Metro, String> {

}
