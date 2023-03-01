package com.adhiravishankar.citiesorganizer.services;

import com.adhiravishankar.citiesorganizer.dtos.DetailedApartmentDTO;
import com.adhiravishankar.citiesorganizer.models.Apartment;

import java.util.List;

public interface ApartmentService {

    List<Apartment> findAll();

    DetailedApartmentDTO readApartment(String id);

    void saveApartment(Apartment apartment);

    void updateApartment(Apartment apartment);

    void deleteByApartment(String id);

}
