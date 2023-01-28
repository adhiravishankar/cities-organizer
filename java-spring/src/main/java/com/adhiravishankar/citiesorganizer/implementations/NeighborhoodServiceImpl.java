package com.adhiravishankar.citiesorganizer.implementations;

import com.adhiravishankar.citiesorganizer.dtos.DetailedCityDTO;
import com.adhiravishankar.citiesorganizer.dtos.DetailedNeighborhoodDTO;
import com.adhiravishankar.citiesorganizer.dtos.NeighborhoodDTO;
import com.adhiravishankar.citiesorganizer.models.City;
import com.adhiravishankar.citiesorganizer.models.Neighborhood;
import com.adhiravishankar.citiesorganizer.models.Picture;
import com.adhiravishankar.citiesorganizer.repositories.NeighborhoodRepository;
import com.adhiravishankar.citiesorganizer.repositories.PictureRepository;
import com.adhiravishankar.citiesorganizer.services.NeighborhoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class NeighborhoodServiceImpl implements NeighborhoodService {

    @Autowired
    NeighborhoodRepository neighborhoodRepository;

    @Autowired
    private PictureRepository pictureRepository;

    @Override
    public List<Neighborhood> findAll() {
        return neighborhoodRepository.findAll();
    }

    @Override
    public DetailedNeighborhoodDTO readNeighborhood(String id) {
        Optional<Neighborhood> optionalNeighborhood = neighborhoodRepository.findById(id);
        DetailedNeighborhoodDTO detailedNeighborhood = new DetailedNeighborhoodDTO();
        if (optionalNeighborhood.isPresent()) {
            detailedNeighborhood.setNeighborhood(optionalNeighborhood.get());
        } else {
            throw new ResponseStatusException(NOT_FOUND, "Unable to find city");
        }

        List<Picture> pictures = pictureRepository.findPicturesByID(id);
        List<String> pictureURLs = new ArrayList<>();
        for (Picture picture : pictures) {
            pictureURLs.add(picture.getURL());
        }

        detailedNeighborhood.setPics(pictureURLs);
        return detailedNeighborhood;
    }

    @Override
    public void saveNeighborhood(Neighborhood neighborhood) {
        neighborhood.setID(UUID.randomUUID().toString());
        neighborhoodRepository.insert(neighborhood);
    }

    @Override
    public void updateNeighborhood(Neighborhood neighborhood) {
        neighborhoodRepository.save(neighborhood);
    }

    @Override
    public void deleteByNeighborhood(String id) {
        neighborhoodRepository.deleteById(id);
    }
}
