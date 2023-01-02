package com.adhiravishankar.citiesorganizer.controllers;

import com.adhiravishankar.citiesorganizer.dtos.MetroDTO;
import com.adhiravishankar.citiesorganizer.models.Metro;
import com.adhiravishankar.citiesorganizer.services.MetroService;
import com.adhiravishankar.citiesorganizer.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class MetroController {

    @Autowired
    private MetroService service;

    @GetMapping("/metros")
    public List<MetroDTO> getMetros() {
        return ObjectMapperUtils.mapAll(service.findAll(), MetroDTO.class);
    }

    @PostMapping("/metros")
    public void postMetro() {

    }

    @GetMapping("/metros/{metro}")
    public MetroDTO readMetro(@PathVariable String metro) {
        return ObjectMapperUtils.map(service.readMetro(metro), MetroDTO.class);
    }

    @PutMapping("/metros/{metro}")
    public void updateMetro() {

    }

    @DeleteMapping("/metros/{metro}")
    public void deleteMetro(@PathVariable String metro) {
        service.deleteByMetro(metro);
    }

}
