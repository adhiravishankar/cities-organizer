package com.adhiravishankar.citiesorganizer.services;

import com.adhiravishankar.citiesorganizer.dtos.DetailedCityDTO;
import com.adhiravishankar.citiesorganizer.models.City;

import java.util.List;
import java.util.Optional;

public interface CityService {

    List<City> findAll();

    DetailedCityDTO readCity(String id);

    void saveCity(City city);

    void updateCity(City city);

    void deleteByCity(String id);

}
