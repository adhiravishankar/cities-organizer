package com.adhiravishankar.citiesorganizer.implementations;

import com.adhiravishankar.citiesorganizer.models.Metro;
import com.adhiravishankar.citiesorganizer.repositories.MetroRepository;
import com.adhiravishankar.citiesorganizer.services.MetroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MetroServiceImpl implements MetroService {
    @Autowired
    private MetroRepository metroRepository;

    @Override
    public List<Metro> findAll() {
        return metroRepository.findAll();
    }

    @Override
    public Optional<Metro> readMetro(String id) {
        return metroRepository.findById(id);
    }

    @Override
    public void saveMetro(Metro metro) {
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
