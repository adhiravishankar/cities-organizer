package com.adhiravishankar.citiesorganizer.controllers;

import com.adhiravishankar.citiesorganizer.dtos.ApartmentDTO;
import com.adhiravishankar.citiesorganizer.dtos.DetailedApartmentDTO;
import com.adhiravishankar.citiesorganizer.models.Apartment;
import com.adhiravishankar.citiesorganizer.services.ApartmentService;
import com.adhiravishankar.citiesorganizer.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ApartmentController {

    @Autowired
    ApartmentService service;

    @GetMapping("/apartments")
    public List<ApartmentDTO> getApartments() {
        return ObjectMapperUtils.mapAll(service.findAll(), ApartmentDTO.class);
    }

    @PostMapping("/apartments")
    public ResponseEntity<?> postApartment(@RequestBody ApartmentDTO apartmentDTO) {
        Apartment apartment = ObjectMapperUtils.map(apartmentDTO, Apartment.class);
        service.saveApartment(apartment);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/apartments/{apartment}")
    public DetailedApartmentDTO readApartment(@PathVariable String apartment) {
        return service.readApartment(apartment);
    }

    @PutMapping("/apartments/{apartment}")
    public ResponseEntity<?> updateApartment(@RequestBody ApartmentDTO apartmentDTO) {
        Apartment apartment = ObjectMapperUtils.map(apartmentDTO, Apartment.class);
        service.updateApartment(apartment);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/apartments/{apartment}")
    public ResponseEntity<?> deleteApartment(@PathVariable String apartment) {
        service.deleteByApartment(apartment);
        return ResponseEntity.ok().build();
    }

}
