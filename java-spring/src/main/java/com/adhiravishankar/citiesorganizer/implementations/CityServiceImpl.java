package com.adhiravishankar.citiesorganizer.implementations;

import com.adhiravishankar.citiesorganizer.dtos.DetailedCityDTO;
import com.adhiravishankar.citiesorganizer.models.City;
import com.adhiravishankar.citiesorganizer.models.Picture;
import com.adhiravishankar.citiesorganizer.repositories.CityRepository;
import com.adhiravishankar.citiesorganizer.repositories.NeighborhoodRepository;
import com.adhiravishankar.citiesorganizer.repositories.PictureRepository;
import com.adhiravishankar.citiesorganizer.services.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class CityServiceImpl implements CityService {
    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private PictureRepository pictureRepository;

    @Autowired
    private NeighborhoodRepository neighborhoodRepository;

    @Override
    public List<City> findAll() {
        return cityRepository.findAll();
    }

    @Override
    public DetailedCityDTO readCity(String id) {
        Optional<City> optionalCity = cityRepository.findById(id);
        DetailedCityDTO detailedCity = new DetailedCityDTO();
        if (optionalCity.isPresent()) {
            detailedCity.setCity(optionalCity.get());
        } else {
            throw new ResponseStatusException(NOT_FOUND, "Unable to find city");
        }

        List<Picture> pictures = pictureRepository.findPicturesByCity(id);
        List<String> pictureURLs = new ArrayList<>();
        for (Picture picture : pictures) {
            pictureURLs.add(picture.getURL());
        }

        detailedCity.setPics(pictureURLs);
        detailedCity.setNeighborhoods(neighborhoodRepository.findNeighborhoodsByCity(id));
        return detailedCity;
    }

    @Override
    public void saveCity(City city) {
        city.setID(UUID.randomUUID().toString());
        cityRepository.insert(city);
    }

    @Override
    public void updateCity(City city) {
        cityRepository.save(city);
    }

    @Override
    public void deleteByCity(String id) {
        cityRepository.deleteById(id);
    }
}
