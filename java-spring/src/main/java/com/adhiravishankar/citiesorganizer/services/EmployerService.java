package com.adhiravishankar.citiesorganizer.services;

import com.adhiravishankar.citiesorganizer.dtos.DetailedEmployerDTO;
import com.adhiravishankar.citiesorganizer.dtos.EmployerDTO;
import com.adhiravishankar.citiesorganizer.models.Employer;

import java.util.List;

public interface EmployerService {

    List<Employer> findAll();

    DetailedEmployerDTO readEmployer(String id);

    void saveEmployer(Employer employer);

    void updateEmployer(Employer employer);

    void deleteByEmployer(String id);

}
