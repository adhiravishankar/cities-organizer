package com.adhiravishankar.citiesorganizer.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document("metros")
public class Metro {

    @Id
    private String id;
    private String name;
    private String extendedName;
    private Integer population;
    private String notes;
    private String featuredImage;

    public Metro(String name, String extendedName, Integer population, String notes, String featuredImage) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.extendedName = extendedName;
        this.population = population;
        this.notes = notes;
        this.featuredImage = featuredImage;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExtendedName() {
        return extendedName;
    }

    public void setExtendedName(String extendedName) {
        this.extendedName = extendedName;
    }

    public Integer getPopulation() {
        return population;
    }

    public void setPopulation(Integer population) {
        this.population = population;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getFeaturedImage() {
        return featuredImage;
    }

    public void setFeaturedImage(String featuredImage) {
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
