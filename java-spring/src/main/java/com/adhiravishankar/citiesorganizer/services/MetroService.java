package com.adhiravishankar.citiesorganizer.services;

import com.adhiravishankar.citiesorganizer.models.Metro;

import java.util.List;

public interface MetroService {

    List<Metro> findAll();

    void deleteByMetro(String id);

}
