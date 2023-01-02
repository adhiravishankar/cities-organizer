package com.adhiravishankar.citiesorganizer.controllers;

import com.adhiravishankar.citiesorganizer.dtos.MetroDTO;
import com.adhiravishankar.citiesorganizer.models.Metro;
import com.adhiravishankar.citiesorganizer.services.MetroService;
import com.adhiravishankar.citiesorganizer.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MetroController {

    @Autowired
    private MetroService service;

    @GetMapping("/metros")
    public List<MetroDTO> getMetros() {
        return ObjectMapperUtils.mapAll(service.findAll(), MetroDTO.class);
    }

    @PostMapping("/metros")
    public ResponseEntity<?> postMetro(@RequestBody MetroDTO metroDTO) {
        Metro metro = ObjectMapperUtils.map(metroDTO, Metro.class);
        service.saveMetro(metro);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/metros/{metro}")
    public MetroDTO readMetro(@PathVariable String metro) {
        return ObjectMapperUtils.map(service.readMetro(metro), MetroDTO.class);
    }

    @PutMapping("/metros/{metro}")
    public ResponseEntity<?> updateMetro(@RequestBody MetroDTO metroDTO) {
        Metro metro = ObjectMapperUtils.map(metroDTO, Metro.class);
        service.updateMetro(metro);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/metros/{metro}")
    public ResponseEntity<?> deleteMetro(@PathVariable String metro) {
        service.deleteByMetro(metro);
        return ResponseEntity.ok().build();
    }

}
