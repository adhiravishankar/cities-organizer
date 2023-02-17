package com.adhiravishankar.citiesorganizer.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

public class EmployerLocation {

    @Id
    String ID;

    @Field("city_id")
    String CityID;

    @Field("metro_id")
    String MetroID;




}
