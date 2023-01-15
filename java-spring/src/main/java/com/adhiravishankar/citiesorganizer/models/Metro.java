package com.adhiravishankar.citiesorganizer.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.UUID;

@Document("metros")
public class Metro {

    @Id
    private String ID;

    @Field("name")
    private String Name;

    @Field("extended_name")
    private String ExtendedName;

    @Field("small_name")
    private String SmallName;

    @Field("population")
    private Integer Population;

    @Field("notes")
    private String Notes;

    @Field("featured_image")
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

    public String getSmallName() {
        return SmallName;
    }

    public void setSmallName(String smallName) {
        SmallName = smallName;
    }
}
