package com.adhiravishankar.citiesorganizer.models;

public class Metro {

    String ID;

    String Name;

    String ExtendedName;

    String SmallName;

    Integer Population;

    Integer MetroSizeRank;

    String Notes;

    String FeaturedImage;

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

    public String getSmallName() {
        return SmallName;
    }

    public void setSmallName(String smallName) {
        SmallName = smallName;
    }

    public Integer getPopulation() {
        return Population;
    }

    public void setPopulation(Integer population) {
        Population = population;
    }

    public Integer getMetroSizeRank() {
        return MetroSizeRank;
    }

    public void setMetroSizeRank(Integer metroSizeRank) {
        MetroSizeRank = metroSizeRank;
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
