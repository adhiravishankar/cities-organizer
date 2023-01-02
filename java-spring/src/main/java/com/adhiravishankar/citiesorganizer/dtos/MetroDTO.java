package com.adhiravishankar.citiesorganizer.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MetroDTO {

    @JsonProperty("ID")
    private String ID;

    @JsonProperty("Name")
    private String Name;

    @JsonProperty("ExtendedName")
    private String ExtendedName;

    @JsonProperty("Population")
    private Integer Population;

    @JsonProperty("Notes")
    private String Notes;

    @JsonProperty("FeaturedImage")
    private String FeaturedImage;

    public MetroDTO() {
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
