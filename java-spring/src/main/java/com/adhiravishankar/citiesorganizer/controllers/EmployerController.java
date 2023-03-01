package com.adhiravishankar.citiesorganizer.controllers;

import com.adhiravishankar.citiesorganizer.dtos.DetailedEmployerDTO;
import com.adhiravishankar.citiesorganizer.dtos.EmployerDTO;
import com.adhiravishankar.citiesorganizer.models.Employer;
import com.adhiravishankar.citiesorganizer.services.EmployerService;
import com.adhiravishankar.citiesorganizer.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmployerController {

    @Autowired
    EmployerService service;

    @GetMapping("/employers")
    public List<EmployerDTO> getEmployers() {
        return ObjectMapperUtils.mapAll(service.findAll(), EmployerDTO.class);
    }

    @PostMapping("/employers")
    public ResponseEntity<?> postEmployer(@RequestBody EmployerDTO employerDTO) {
        Employer employer = ObjectMapperUtils.map(employerDTO, Employer.class);
        service.saveEmployer(employer);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/employers/{employer}")
    public DetailedEmployerDTO readEmployer(@PathVariable String employer) {
        return service.readEmployer(employer);
    }

    @PutMapping("/employers/{employer}")
    public ResponseEntity<?> updateEmployer(@RequestBody EmployerDTO employerDTO) {
        Employer employer = ObjectMapperUtils.map(employerDTO, Employer.class);
        service.updateEmployer(employer);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/employers/{employer}")
    public ResponseEntity<?> deleteEmployer(@PathVariable String employer) {
        service.deleteByEmployer(employer);
        return ResponseEntity.ok().build();
    }

}
