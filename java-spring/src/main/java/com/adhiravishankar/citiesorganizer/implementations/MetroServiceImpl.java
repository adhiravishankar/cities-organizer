package com.adhiravishankar.citiesorganizer.implementations;

import com.adhiravishankar.citiesorganizer.dtos.DetailedCityDTO;
import com.adhiravishankar.citiesorganizer.dtos.DetailedMetroDTO;
import com.adhiravishankar.citiesorganizer.models.City;
import com.adhiravishankar.citiesorganizer.models.Metro;
import com.adhiravishankar.citiesorganizer.models.Picture;
import com.adhiravishankar.citiesorganizer.repositories.MetroRepository;
import com.adhiravishankar.citiesorganizer.repositories.NeighborhoodRepository;
import com.adhiravishankar.citiesorganizer.repositories.PictureRepository;
import com.adhiravishankar.citiesorganizer.services.MetroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class MetroServiceImpl implements MetroService {
    @Autowired
    private MetroRepository metroRepository;

    @Autowired
    private PictureRepository pictureRepository;

    @Autowired
    private NeighborhoodRepository neighborhoodRepository;

    @Override
    public List<Metro> findAll() {
        return metroRepository.findAll();
    }

    @Override
    public DetailedMetroDTO readMetro(String id) {
        Optional<Metro> optionalMetro = metroRepository.findById(id);
        DetailedMetroDTO detailedMetro = new DetailedMetroDTO();
        if (optionalMetro.isPresent()) {
            detailedMetro.setMetropolitan(optionalMetro.get());
        } else {
            throw new ResponseStatusException(NOT_FOUND, "Unable to find metro");
        }

        List<Picture> pictures = pictureRepository.findPicturesByID(id);
        List<String> pictureURLs = new ArrayList<>();
        for (Picture picture : pictures) {
            pictureURLs.add(picture.getURL());
        }

        detailedMetro.setPics(pictureURLs);
        detailedMetro.setNeighborhoods(neighborhoodRepository.findNeighborhoodsByCity(id));
        return detailedMetro;
    }

    @Override
    public void saveMetro(Metro metro) {
        metro.setID(UUID.randomUUID().toString());
        metroRepository.insert(metro);
    }

    @Override
    public void updateMetro(Metro metro) {
        metroRepository.save(metro);
    }

    @Override
    public void deleteByMetro(String id) {
        metroRepository.deleteById(id);
    }
}
