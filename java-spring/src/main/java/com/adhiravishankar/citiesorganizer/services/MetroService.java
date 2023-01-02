package com.adhiravishankar.citiesorganizer.services;

import com.adhiravishankar.citiesorganizer.dtos.MetroDTO;
import com.adhiravishankar.citiesorganizer.models.Metro;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

public interface MetroService {

    List<Metro> findAll();

    Optional<Metro> readMetro(String id);

    void saveMetro(@RequestBody MetroDTO metro);

    void updateMetro(String id, @RequestBody MetroDTO metro);

    void deleteByMetro(String id);

}
