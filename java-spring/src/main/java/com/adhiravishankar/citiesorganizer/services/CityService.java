package com.adhiravishankar.citiesorganizer.services;

import com.adhiravishankar.citiesorganizer.models.City;

import java.util.List;
import java.util.Optional;

public interface CityService {

    List<City> findAll();

    Optional<City> readCity(String id);

    void saveCity(City city);

    void updateCity(City city);

    void deleteByCity(String id);

}
