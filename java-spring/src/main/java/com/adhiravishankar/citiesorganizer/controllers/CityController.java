package com.adhiravishankar.citiesorganizer.controllers;

import com.adhiravishankar.citiesorganizer.dtos.CityDTO;
import com.adhiravishankar.citiesorganizer.services.CityService;
import com.adhiravishankar.citiesorganizer.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void postCity() {

    }

    @GetMapping("/cities/{city}")
    public void readCity(@PathVariable String city) {

    }

    @PutMapping("/cities/{city}")
    public void updateCity(@PathVariable String city) {

    }

    @DeleteMapping("/cities/{city}")
    public void deleteCity(@PathVariable String city) {

    }

}
