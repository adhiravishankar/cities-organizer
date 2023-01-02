package com.adhiravishankar.citiesorganizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class CitiesOrganizerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CitiesOrganizerApplication.class, args);
	}

}
