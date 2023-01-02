package com.adhiravishankar.citiesorganizer.controllers;

import com.adhiravishankar.citiesorganizer.dtos.MetroDTO;
import com.adhiravishankar.citiesorganizer.models.Metro;
import com.adhiravishankar.citiesorganizer.services.MetroService;
import com.adhiravishankar.citiesorganizer.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MetroController {

    @Autowired
    private MetroService service;

    @GetMapping("/metros")
    public List<MetroDTO> getMetros() {
        return ObjectMapperUtils.mapAll(service.findAll(), MetroDTO.class);
    }

}
