package com.adhiravishankar.citiesorganizer.implementations;

import com.adhiravishankar.citiesorganizer.dtos.CityDTO;
import com.adhiravishankar.citiesorganizer.models.City;
import com.adhiravishankar.citiesorganizer.repositories.CityRepository;
import com.adhiravishankar.citiesorganizer.services.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityServiceImpl implements CityService {
    @Autowired
    private CityRepository cityRepository;

    @Override
    public List<City> findAll() {
        return cityRepository.findAll();
    }

    @Override
    public Optional<City> readCity(String id) {
        return Optional.empty();
    }

    @Override
    public void saveCity(CityDTO city) {

    }

    @Override
    public void updateCity(String id, CityDTO city) {

    }

    @Override
    public void deleteByCity(String id) {
        cityRepository.deleteById(id);
    }
}
