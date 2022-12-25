package com.adhiravishankar.citiesorganizer.controllers;

import com.adhiravishankar.citiesorganizer.models.Metro;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MetroController {

    @RequestMapping("/metros")
    public List<Metro> getMetros() {
        List<Metro> metros = new ArrayList<>();
        return metros;
    }

}
