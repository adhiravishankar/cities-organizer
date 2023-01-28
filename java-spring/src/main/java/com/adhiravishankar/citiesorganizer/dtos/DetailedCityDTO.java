package com.adhiravishankar.citiesorganizer.dtos;

import com.adhiravishankar.citiesorganizer.models.City;
import com.adhiravishankar.citiesorganizer.models.Neighborhood;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

public class DetailedCityDTO {

    @Field("City")
    City city;

    List<String> Pics;

    List<Neighborhood> Neighborhoods;

    public DetailedCityDTO() {
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
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
