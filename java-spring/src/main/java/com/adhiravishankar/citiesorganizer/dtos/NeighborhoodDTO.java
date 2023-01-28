package com.adhiravishankar.citiesorganizer.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NeighborhoodDTO {

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

    @JsonProperty("HighSchoolScore")
    Integer HighSchoolScore;

    @JsonProperty("MiddleSchoolScore")
    Integer MiddleSchoolScore;

    @JsonProperty("ElementarySchoolScore")
    Integer ElementarySchoolScore;

    @JsonProperty("Address")
    String Address;

    @JsonProperty("MinimumValue")
    Integer MinimumValue;

    @JsonProperty("MaximumValue")
    Integer MaximumValue;

    @JsonProperty("MinSqft")
    Integer MinSqft;

    @JsonProperty("MaxSqft")
    Integer MaxSqft;

    @JsonProperty("Notes")
    String Notes;

    public NeighborhoodDTO() {
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

    @JsonProperty("Scores")
    public String getScores() {
        return getElementarySchoolScore() + ", " + getMiddleSchoolScore() + ", " + getHighSchoolScore();
    }

    @JsonProperty("ValuesRange")
    public String getValuesRange() {
        return "$" + getMinimumValue() + " - $" + getMaximumValue();
    }

    @JsonProperty("SqFtRange")
    public String getSqFtRange() {
        return getMinSqft() + " - " + getMaxSqft() + " sq. ft.";
    }
}
