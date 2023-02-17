package com.adhiravishankar.citiesorganizer.services;

import com.adhiravishankar.citiesorganizer.dtos.ApartmentDTO;
import com.adhiravishankar.citiesorganizer.models.Apartment;

import java.util.List;

public interface ApartmentService {

    List<Apartment> findAll();

    ApartmentDTO readApartment(String id);

    void saveApartment(Apartment apartment);

    void updateApartment(Apartment apartment);

    void deleteByApartment(Apartment id);

}
