package com.adhiravishankar.citiesorganizer.services;

import com.adhiravishankar.citiesorganizer.dtos.CityDTO;
import com.adhiravishankar.citiesorganizer.models.City;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

public interface CityService {

    List<City> findAll();

    Optional<City> readCity(String id);

    void saveCity(@RequestBody CityDTO city);

    void updateCity(String id, @RequestBody CityDTO city);

    void deleteByCity(String id);

}
