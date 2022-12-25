package com.adhiravishankar.citiesorganizer.models;

public class Metro {

    private Integer id;
    private String name;
    private String extendedName;
    private Integer population;
    private String notes;
    private String featuredImage;

    public Metro(Integer id, String name, String extendedName, Integer population, String notes, String featuredImage) {
        this.id = id;
        this.name = name;
        this.extendedName = extendedName;
        this.population = population;
        this.notes = notes;
        this.featuredImage = featuredImage;
    }

    @Override
    public String toString() {
        return "Metro{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", extendedName='" + extendedName + '\'' +
                ", population=" + population +
                ", notes='" + notes + '\'' +
                ", featuredImage='" + featuredImage + '\'' +
                '}';
    }
}
