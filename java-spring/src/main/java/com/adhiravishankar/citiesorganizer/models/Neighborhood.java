package com.adhiravishankar.citiesorganizer.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("neighborhoods")
public class Neighborhood {

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

    @Field("high_school_score")
    Integer HighSchoolScore;

    @Field("middle_school_score")
    Integer MiddleSchoolScore;

    @Field("elementary_school_score")
    Integer ElementarySchoolScore;

    @Field("address")
    String Address;

    @Field("minimum_value")
    Integer MinimumValue;

    @Field("maximum_value")
    Integer MaximumValue;

    @Field("min_sqft")
    Integer MinSqft;

    @Field("max_sqft")
    Integer MaxSqft;

    @Field("notes")
    String Notes;

    public Neighborhood() {
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

    public Integer getHighSchoolScore() {
        return HighSchoolScore;
    }

    public void setHighSchoolScore(Integer highSchoolScore) {
        HighSchoolScore = highSchoolScore;
    }

    public Integer getMiddleSchoolScore() {
        return MiddleSchoolScore;
    }

    public void setMiddleSchoolScore(Integer middleSchoolScore) {
        MiddleSchoolScore = middleSchoolScore;
    }

    public Integer getElementarySchoolScore() {
        return ElementarySchoolScore;
    }

    public void setElementarySchoolScore(Integer elementarySchoolScore) {
        ElementarySchoolScore = elementarySchoolScore;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public Integer getMinimumValue() {
        return MinimumValue;
    }

    public void setMinimumValue(Integer minimumValue) {
        MinimumValue = minimumValue;
    }

    public Integer getMaximumValue() {
        return MaximumValue;
    }

    public void setMaximumValue(Integer maximumValue) {
        MaximumValue = maximumValue;
    }

    public Integer getMinSqft() {
        return MinSqft;
    }

    public void setMinSqft(Integer minSqft) {
        MinSqft = minSqft;
    }

    public Integer getMaxSqft() {
        return MaxSqft;
    }

    public void setMaxSqft(Integer maxSqft) {
        MaxSqft = maxSqft;
    }

    public String getNotes() {
        return Notes;
    }

    public void setNotes(String notes) {
        Notes = notes;
    }
}
