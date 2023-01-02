package com.adhiravishankar.citiesorganizer.dtos;

public class CityDTO {

    String id;

    String MetroID;

    String Name;

    String Population;

    String FeaturedImage;

    String Notes;

    public CityDTO() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
}
