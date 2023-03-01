package com.adhiravishankar.citiesorganizer.implementations;

import com.adhiravishankar.citiesorganizer.dtos.DetailedApartmentDTO;
import com.adhiravishankar.citiesorganizer.dtos.DetailedEmployerDTO;
import com.adhiravishankar.citiesorganizer.dtos.EmployerDTO;
import com.adhiravishankar.citiesorganizer.models.Apartment;
import com.adhiravishankar.citiesorganizer.models.Employer;
import com.adhiravishankar.citiesorganizer.models.Picture;
import com.adhiravishankar.citiesorganizer.repositories.ApartmentRepository;
import com.adhiravishankar.citiesorganizer.repositories.EmployerRepository;
import com.adhiravishankar.citiesorganizer.repositories.PictureRepository;
import com.adhiravishankar.citiesorganizer.services.ApartmentService;
import com.adhiravishankar.citiesorganizer.services.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.HttpStatus.NOT_FOUND;

public class EmployerServiceImpl implements EmployerService {

    @Autowired
    EmployerRepository employerRepository;

    @Autowired
    private PictureRepository pictureRepository;

    @Override
    public List<Employer> findAll() {
        return employerRepository.findAll();
    }

    @Override
    public DetailedEmployerDTO readEmployer(String id) {
        Optional<Employer> optionalEmployer = employerRepository.findById(id);
        DetailedEmployerDTO detailedEmployer = new DetailedEmployerDTO();
        if (optionalEmployer.isPresent()) {
            detailedEmployer.setEmployer(optionalEmployer.get());
        } else {
            throw new ResponseStatusException(NOT_FOUND, "Unable to find city");
        }

        List<Picture> pictures = pictureRepository.findPicturesByID(id);
        List<String> pictureURLs = new ArrayList<>();
        for (Picture picture : pictures) {
            pictureURLs.add(picture.getURL());
        }

        detailedEmployer.setPics(pictureURLs);
        return detailedEmployer;
    }

    @Override
    public void saveEmployer(Employer employer) {
        employer.setID(UUID.randomUUID().toString());
        employerRepository.insert(employer);
    }

    @Override
    public void updateEmployer(Employer employer) {
        employerRepository.save(employer);
    }

    @Override
    public void deleteByEmployer(String id) {
        employerRepository.deleteById(id);
    }

}
