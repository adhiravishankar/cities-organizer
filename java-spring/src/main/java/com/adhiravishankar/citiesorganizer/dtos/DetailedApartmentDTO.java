package com.adhiravishankar.citiesorganizer.dtos;

import com.adhiravishankar.citiesorganizer.models.Apartment;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

public class DetailedApartmentDTO {

    @Field("Apartment")
    Apartment apartment;

    List<String> Pics;

    public DetailedApartmentDTO() {
    }

    public Apartment getApartment() {
        return apartment;
    }

    public void setApartment(Apartment apartment) {
        this.apartment = apartment;
    }

    public List<String> getPics() {
        return Pics;
    }

    public void setPics(List<String> pics) {
        Pics = pics;
    }
}
