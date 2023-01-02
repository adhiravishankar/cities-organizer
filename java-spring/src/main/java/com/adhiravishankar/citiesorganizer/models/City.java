package com.adhiravishankar.citiesorganizer.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("cities")
public class City {

    @Id
    String id;

    @Field("metro_id")
    String MetroID;

    @Field("name")
    String Name;

    @Field("population")
    String Population;

    @Field("featured_images")
    String FeaturedImage;

    @Field("notes")
    String Notes;


}
