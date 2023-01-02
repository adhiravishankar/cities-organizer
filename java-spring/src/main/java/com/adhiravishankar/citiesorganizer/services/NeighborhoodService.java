package com.adhiravishankar.citiesorganizer.services;

import com.adhiravishankar.citiesorganizer.models.Neighborhood;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

public interface NeighborhoodService {

    List<Neighborhood> findAll();

    Optional<Neighborhood> readNeighborhood(String id);

    void saveNeighborhood(Neighborhood city);

    void updateNeighborhood(Neighborhood city);

    void deleteByNeighborhood(String id);

}
