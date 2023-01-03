package com.adhiravishankar.citiesorganizer.repositories;

import com.adhiravishankar.citiesorganizer.models.Picture;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PictureRepository extends MongoRepository<Picture, String> {
    @Query("{'attribute_id' : :#{#attribute_id}}")
    List<Picture> findPicturesByID(@Param("attribute_id") String attributeID);
}
