package com.adhiravishankar.citiesorganizer.implementations;

import com.adhiravishankar.citiesorganizer.dtos.NeighborhoodDTO;
import com.adhiravishankar.citiesorganizer.models.Neighborhood;
import com.adhiravishankar.citiesorganizer.repositories.NeighborhoodRepository;
import com.adhiravishankar.citiesorganizer.services.NeighborhoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
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
    public void saveNeighborhood(Neighborhood city) {
        neighborhoodRepository.insert(city);
    }

    @Override
    public void updateNeighborhood(Neighborhood city) {
        neighborhoodRepository.save(city);
    }

    @Override
    public void deleteByNeighborhood(String id) {
        neighborhoodRepository.deleteById(id);
    }
}
