package com.adhiravishankar.citiesorganizer.services;

import com.adhiravishankar.citiesorganizer.models.Neighborhood;

import java.util.List;
import java.util.Optional;

public interface NeighborhoodService {

    List<Neighborhood> findAll();

    Optional<Neighborhood> readNeighborhood(String id);

    void saveNeighborhood(Neighborhood neighborhood);

    void updateNeighborhood(Neighborhood neighborhood);

    void deleteByNeighborhood(String id);

}
