package com.adhiravishankar.citiesorganizer.implementations;

import com.adhiravishankar.citiesorganizer.models.Metro;
import com.adhiravishankar.citiesorganizer.repositories.MetroRepository;
import com.adhiravishankar.citiesorganizer.services.MetroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetroServiceImpl implements MetroService {
    @Autowired
    private MetroRepository metroRepository;

    @Override
    public List<Metro> findAll() {
        return metroRepository.findAll();
    }

    @Override
    public void deleteByMetro(String id) {
        metroRepository.deleteById(id);
    }
}
