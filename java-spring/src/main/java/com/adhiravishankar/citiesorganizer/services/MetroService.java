package com.adhiravishankar.citiesorganizer.services;

import com.adhiravishankar.citiesorganizer.models.Metro;

import java.util.List;
import java.util.Optional;

public interface MetroService {

    List<Metro> findAll();

    Optional<Metro> readMetro(String id);

    void saveMetro(Metro metro);

    void updateMetro(Metro metro);

    void deleteByMetro(String id);

}
