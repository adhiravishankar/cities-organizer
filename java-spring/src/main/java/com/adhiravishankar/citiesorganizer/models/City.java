package com.adhiravishankar.citiesorganizer.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("cities")
public class City {

    @Id
    String ID;

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

    public City() {
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getMetroID() {
        return MetroID;
    }

    public void setMetroID(String metroID) {
        MetroID = metroID;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getPopulation() {
        return Population;
    }

    public void setPopulation(String population) {
        Population = population;
    }

    public String getFeaturedImage() {
        return FeaturedImage;
    }

    public void setFeaturedImage(String featuredImage) {
        FeaturedImage = featuredImage;
    }

    public String getNotes() {
        return Notes;
    }

    public void setNotes(String notes) {
        Notes = notes;
    }

    @Override
    public String toString() {
        return "City{" +
                "id='" + ID + '\'' +
                ", MetroID='" + MetroID + '\'' +
                ", Name='" + Name + '\'' +
                ", Population='" + Population + '\'' +
                ", FeaturedImage='" + FeaturedImage + '\'' +
                ", Notes='" + Notes + '\'' +
                '}';
    }
}
