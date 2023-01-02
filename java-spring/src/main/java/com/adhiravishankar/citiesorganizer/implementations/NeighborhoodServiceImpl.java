package com.adhiravishankar.citiesorganizer.implementations;

import com.adhiravishankar.citiesorganizer.dtos.NeighborhoodDTO;
import com.adhiravishankar.citiesorganizer.models.Neighborhood;
import com.adhiravishankar.citiesorganizer.repositories.NeighborhoodRepository;
import com.adhiravishankar.citiesorganizer.services.NeighborhoodService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class NeighborhoodServiceImpl implements NeighborhoodService {

    @Autowired
    NeighborhoodRepository neighborhoodRepository;

    @Override
    public List<Neighborhood> findAll() {
        return neighborhoodRepository.findAll();
    }

    @Override
    public Optional<Neighborhood> readNeighborhood(String id) {
        return neighborhoodRepository.findById(id);
    }

    @Override
    public void saveNeighborhood(NeighborhoodDTO city) {

    }

    @Override
    public void updateNeighborhood(String id, NeighborhoodDTO city) {

    }

    @Override
    public void deleteByNeighborhood(String id) {
        neighborhoodRepository.deleteById(id);
    }
}
