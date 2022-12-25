package com.adhiravishankar.citiesorganizer.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("metros")
public class Metro {

    @Id
    private String id;
    private String name;
    private String extendedName;
    private Integer population;
    private String notes;
    private String featuredImage;

    public Metro(String id, String name, String extendedName, Integer population, String notes, String featuredImage) {
        this.id = id;
        this.name = name;
        this.extendedName = extendedName;
        this.population = population;
        this.notes = notes;
        this.featuredImage = featuredImage;
    }

    @Override
    public String toString() {
        return "Metro{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", extendedName='" + extendedName + '\'' +
                ", population=" + population +
                ", notes='" + notes + '\'' +
                ", featuredImage='" + featuredImage + '\'' +
                '}';
    }
}
