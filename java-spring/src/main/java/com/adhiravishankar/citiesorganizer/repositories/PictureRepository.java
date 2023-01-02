package com.adhiravishankar.citiesorganizer.repositories;

import com.adhiravishankar.citiesorganizer.models.Picture;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PictureRepository extends MongoRepository<Picture, String> {

    @Query("{'metro_id' : :#{#metro_id}}")
    List<Picture> findPicturesByMetro(@Param("metro_id") String metroID);

    @Query("{'city_id' : :#{#city_id}}")
    List<Picture> findPicturesByCity(@Param("city_id") String cityID);
}
