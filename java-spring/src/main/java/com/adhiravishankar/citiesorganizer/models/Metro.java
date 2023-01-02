package com.adhiravishankar.citiesorganizer.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document("metros")
public class Metro {

    @Id
    private String ID;
    private String Name;
    private String ExtendedName;
    private Integer Population;
    private String Notes;
    private String FeaturedImage;

    public Metro() {
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getExtendedName() {
        return ExtendedName;
    }

    public void setExtendedName(String extendedName) {
        ExtendedName = extendedName;
    }

    public Integer getPopulation() {
        return Population;
    }

    public void setPopulation(Integer population) {
        Population = population;
    }

    public String getNotes() {
        return Notes;
    }

    public void setNotes(String notes) {
        Notes = notes;
    }

    public String getFeaturedImage() {
        return FeaturedImage;
    }

    public void setFeaturedImage(String featuredImage) {
        FeaturedImage = featuredImage;
    }
}
