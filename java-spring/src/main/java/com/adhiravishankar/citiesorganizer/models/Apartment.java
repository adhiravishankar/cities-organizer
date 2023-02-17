package com.adhiravishankar.citiesorganizer.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("apartments")
public class Apartment {

    @Id
    String ID;

    @Field("city_id")
    String CityID;

    @Field("metro_id")
    String MetroID;

    @Field("featured_image")
    String FeaturedImage;

    @Field("link")
    String Link;

    @Field("name")
    String Name;

    @Field("address")
    String Address;

    @Field("rent")
    Integer Rent;

    @Field("sqft")
    Integer Sqft;

    @Field("notes")
    String Notes;

    public Apartment() {
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
