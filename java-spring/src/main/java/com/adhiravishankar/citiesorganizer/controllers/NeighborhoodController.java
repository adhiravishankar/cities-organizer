package com.adhiravishankar.citiesorganizer.controllers;

import com.adhiravishankar.citiesorganizer.dtos.NeighborhoodDTO;
import com.adhiravishankar.citiesorganizer.services.NeighborhoodService;
import com.adhiravishankar.citiesorganizer.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NeighborhoodController {

    @Autowired
    NeighborhoodService service;

    @GetMapping("/neighborhoods")
    public List<NeighborhoodDTO> getNeighborhoods() {
        return ObjectMapperUtils.mapAll(service.findAll(), NeighborhoodDTO.class);
    }

    @PostMapping("/neighborhoods")
    public void postNeighborhood(@RequestBody NeighborhoodDTO neighborhood) {

    }

    @GetMapping("/neighborhoods/{neighborhood}")
    public void readNeighborhood(@PathVariable String neighborhood) {

    }

    @PutMapping("/neighborhoods/{neighborhood}")
    public void updateNeighborhood(@PathVariable String neighborhood, @RequestBody NeighborhoodDTO neighborhoodDTO) {

    }

    @DeleteMapping("/neighborhoods/{neighborhood}")
    public void deleteNeighborhood(@PathVariable String neighborhood) {

    }

}
