package com.adhiravishankar.citiesorganizer.implementations;

import com.adhiravishankar.citiesorganizer.dtos.DetailedApartmentDTO;
import com.adhiravishankar.citiesorganizer.models.Apartment;
import com.adhiravishankar.citiesorganizer.models.Picture;
import com.adhiravishankar.citiesorganizer.repositories.ApartmentRepository;
import com.adhiravishankar.citiesorganizer.repositories.PictureRepository;
import com.adhiravishankar.citiesorganizer.services.ApartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.HttpStatus.NOT_FOUND;

public class ApartmentServiceImpl implements ApartmentService {

    @Autowired
    ApartmentRepository apartmentRepository;

    @Autowired
    private PictureRepository pictureRepository;

    @Override
    public List<Apartment> findAll() {
        return apartmentRepository.findAll();
    }

    @Override
    public DetailedApartmentDTO readApartment(String id) {
        Optional<Apartment> optionalApartment = apartmentRepository.findById(id);
        DetailedApartmentDTO detailedApartment = new DetailedApartmentDTO();
        if (optionalApartment.isPresent()) {
            detailedApartment.setApartment(optionalApartment.get());
        } else {
            throw new ResponseStatusException(NOT_FOUND, "Unable to find city");
        }

        List<Picture> pictures = pictureRepository.findPicturesByID(id);
        List<String> pictureURLs = new ArrayList<>();
        for (Picture picture : pictures) {
            pictureURLs.add(picture.getURL());
        }

        detailedApartment.setPics(pictureURLs);
        return detailedApartment;
    }

    @Override
    public void saveApartment(Apartment apartment) {
        apartment.setID(UUID.randomUUID().toString());
        apartmentRepository.insert(apartment);
    }

    @Override
    public void updateApartment(Apartment apartment) {
        apartmentRepository.save(apartment);
    }

    @Override
    public void deleteByApartment(String id) {
        apartmentRepository.deleteById(id);
    }

}
