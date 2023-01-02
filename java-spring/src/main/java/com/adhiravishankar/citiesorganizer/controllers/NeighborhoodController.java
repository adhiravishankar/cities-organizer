package com.adhiravishankar.citiesorganizer.controllers;

import com.adhiravishankar.citiesorganizer.dtos.NeighborhoodDTO;
import com.adhiravishankar.citiesorganizer.models.Neighborhood;
import com.adhiravishankar.citiesorganizer.services.NeighborhoodService;
import com.adhiravishankar.citiesorganizer.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> postNeighborhood(@RequestBody NeighborhoodDTO neighborhoodDTO) {
        Neighborhood neighborhood = ObjectMapperUtils.map(neighborhoodDTO, Neighborhood.class);
        service.saveNeighborhood(neighborhood);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/neighborhoods/{neighborhood}")
    public NeighborhoodDTO readNeighborhood(@PathVariable String neighborhood) {
        return ObjectMapperUtils.map(service.readNeighborhood(neighborhood), NeighborhoodDTO.class);
    }

    @PutMapping("/neighborhoods/{neighborhood}")
    public ResponseEntity<?> updateNeighborhood(@RequestBody NeighborhoodDTO neighborhoodDTO) {
        Neighborhood neighborhood = ObjectMapperUtils.map(neighborhoodDTO, Neighborhood.class);
        service.updateNeighborhood(neighborhood);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/neighborhoods/{neighborhood}")
    public ResponseEntity<?> deleteNeighborhood(@PathVariable String neighborhood) {
        service.deleteByNeighborhood(neighborhood);
        return ResponseEntity.ok().build();
    }

}
