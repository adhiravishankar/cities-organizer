package com.adhiravishankar.citiesorganizer.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ApartmentDTO {

    @JsonProperty("ID")
    String ID;

    @JsonProperty("CityID")
    String CityID;

    @JsonProperty("MetroID")
    String MetroID;

    @JsonProperty("FeaturedImage")
    String FeaturedImage;

    @JsonProperty("Link")
    String Link;

    @JsonProperty("Name")
    String Name;

    @JsonProperty("Address")
    String Address;

    @JsonProperty("Rent")
    Integer Rent;

    @JsonProperty("Sqft")
    Integer Sqft;

    @JsonProperty("Notes")
    String Notes;

    public ApartmentDTO() {
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getCityID() {
        return CityID;
    }

    public void setCityID(String cityID) {
        CityID = cityID;
    }

    public String getMetroID() {
        return MetroID;
    }

    public void setMetroID(String metroID) {
        MetroID = metroID;
    }

    public String getFeaturedImage() {
        return FeaturedImage;
    }

    public void setFeaturedImage(String featuredImage) {
        FeaturedImage = featuredImage;
    }

    public String getLink() {
        return Link;
    }

    public void setLink(String link) {
        Link = link;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public Integer getRent() {
        return Rent;
    }

    public void setRent(Integer rent) {
        Rent = rent;
    }

    public Integer getSqft() {
        return Sqft;
    }

    public void setSqft(Integer sqft) {
        Sqft = sqft;
    }

    public String getNotes() {
        return Notes;
    }

    public void setNotes(String notes) {
        Notes = notes;
    }
}
