package com.adhiravishankar.citiesorganizer.repositories;

import com.adhiravishankar.citiesorganizer.models.Neighborhood;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NeighborhoodRepository extends MongoRepository<Neighborhood, String> {

    @Query("{'metro_id' : :#{#metro_id}}")
    List<Neighborhood> findNeighborhoodsByMetro(@Param("metro_id") String metroID);

    @Query("{'city_id' : :#{#city_id}}")
    List<Neighborhood> findNeighborhoodsByCity(@Param("city_id") String cityID);

}
