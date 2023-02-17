package com.adhiravishankar.citiesorganizer.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

public class Employer {

    @Id
    String ID;

    @Field("name")
    String Name;

    @Field("image")
    String Image;

}
