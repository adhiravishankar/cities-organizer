package com.adhiravishankar.citiesorganizer.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class BaseController {

    @GetMapping("/about")
    public Map<String, String> about() {
        Map<String, String> aboutMap = new HashMap<>();
        aboutMap.put("Language", "JAVA");
        aboutMap.put("Framework", "Spring");
        aboutMap.put("Database", "Mongo");
        aboutMap.put("Cloud", "AWS");
        return aboutMap;
    }

}
