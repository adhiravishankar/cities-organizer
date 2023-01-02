package com.adhiravishankar.citiesorganizer.controllers;

import com.adhiravishankar.citiesorganizer.dtos.CityDTO;
import com.adhiravishankar.citiesorganizer.dtos.DetailedCityDTO;
import com.adhiravishankar.citiesorganizer.models.City;
import com.adhiravishankar.citiesorganizer.services.CityService;
import com.adhiravishankar.citiesorganizer.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CityController {

    @Autowired
    private CityService service;

    @GetMapping("/cities")
    public List<CityDTO> getCities() {
        return ObjectMapperUtils.mapAll(service.findAll(), CityDTO.class);
    }

    @PostMapping("/cities")
    public ResponseEntity<?> postCity() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/cities/{city}")
    public DetailedCityDTO readCity(@PathVariable String city) {
        return service.readCity(city);
    }

    @PutMapping("/cities/{city}")
    public ResponseEntity<?> updateCity(@RequestBody CityDTO cityDTO) {
        City city = ObjectMapperUtils.map(cityDTO, City.class);
        service.updateCity(city);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/cities/{city}")
    public ResponseEntity<?> deleteCity(@PathVariable String city) {
        service.deleteByCity(city);
        return ResponseEntity.ok().build();
    }

}
