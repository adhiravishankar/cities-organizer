package com.adhiravishankar.citiesorganizer.dtos;

import com.adhiravishankar.citiesorganizer.models.City;
import com.adhiravishankar.citiesorganizer.models.Metro;
import com.adhiravishankar.citiesorganizer.models.Neighborhood;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

public class DetailedMetroDTO {

    @Field("Metropolitan")
    Metro Metropolitan;

    List<City> Cities;

    List<String> Pics;

    List<Neighborhood> Neighborhoods;

    public DetailedMetroDTO() {
    }

    public Metro getMetropolitan() {
        return Metropolitan;
    }

    public void setMetropolitan(Metro metropolitan) {
        Metropolitan = metropolitan;
    }

    public List<City> getCities() {
        return Cities;
    }

    public void setCities(List<City> cities) {
        Cities = cities;
    }

    public List<String> getPics() {
        return Pics;
    }

    public void setPics(List<String> pics) {
        Pics = pics;
    }

    public List<Neighborhood> getNeighborhoods() {
        return Neighborhoods;
    }

    public void setNeighborhoods(List<Neighborhood> neighborhoods) {
        Neighborhoods = neighborhoods;
    }
}
