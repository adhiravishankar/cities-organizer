package com.adhiravishankar.citiesorganizer.dtos;

import com.adhiravishankar.citiesorganizer.models.City;
import com.adhiravishankar.citiesorganizer.models.Neighborhood;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

public class DetailedNeighborhoodDTO {

    @Field("Neighborhood")
    Neighborhood neighborhood;

    List<String> Pics;

    public DetailedNeighborhoodDTO() {
    }

    public Neighborhood getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(Neighborhood neighborhood) {
        this.neighborhood = neighborhood;
    }

    public List<String> getPics() {
        return Pics;
    }

    public void setPics(List<String> pics) {
        Pics = pics;
    }
}
