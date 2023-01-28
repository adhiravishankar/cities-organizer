package com.adhiravishankar.citiesorganizer.repositories;

import com.adhiravishankar.citiesorganizer.models.Metro;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetroRepository extends MongoRepository<Metro, String> {

}
