package com.adhiravishankar.citiesorganizer.dtos;

import com.adhiravishankar.citiesorganizer.models.Employer;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

public class DetailedEmployerDTO {

    @Field("Employer")
    Employer employer;

    List<String> Pics;

    public DetailedEmployerDTO() {
    }

    public Employer getNeighborhood() {
        return employer;
    }

    public void setEmployer(Employer neighborhood) {
        this.employer = neighborhood;
    }

    public List<String> getPics() {
        return Pics;
    }

    public void setPics(List<String> pics) {
        Pics = pics;
    }
}
