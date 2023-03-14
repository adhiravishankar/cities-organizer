import { KyResponse } from 'ky';
import { useMemo, useState } from 'react';
import { createContainer } from 'unstated-next';
import { useMap } from 'usehooks-ts';

import { CitiesAPI } from '../apis/CitiesAPI';
import { City } from '../interfaces/City';
import { DetailedCity } from '../interfaces/DetailedCity';

export function useCitiesStore() {
  this.citiesAPI = new CitiesAPI();

  const [cities, setCities] = useState<City[]>([]);
  const [citiesMap, setCitiesMap] = useMap<string, City>();
  const [selectedCity, setSelectedCity] = useState<DetailedCity>(null);
  const [selectedCityArea, setSelectedCityArea] = useState<string>(null);
  
  const filteredCitiesMap = useMemo(() => {
    const namesMap = new Map<string, string>();
    citiesMap.forEach((city: City, key: string) => {
      if (city.MetroID === this.selectedMetroArea) namesMap.set(key, city.Name);
    });
    return namesMap;
  }, [citiesMap]);

  function fetchCities() {
    const response: KyResponse = await this.citiesAPI.cities();
    this.citiesArray = await response.json<City[]>();
    this.citiesMap.clear();
    this.citiesArray.forEach((city: City) => this.citiesMap.set(city.ID, city));
  }

  function fetchCity(id: string) {
    const response: KyResponse = await this.citiesAPI.readCity(id);
    this.selectedCity = await response.json<DetailedCity>();
  }

  function insertCity(name: string, metroID: string, population: number, featuredImage: string, notes: string) {
    const response: KyResponse = await this.citiesAPI.insertCity(name, metroID, population, featuredImage, notes);
    if (response.ok) {
      const cityID = await response.text();
      const city: City = { Name: name, MetroID: metroID, Population: population, FeaturedImage: featuredImage, ID: cityID, Notes: notes };
      this.citiesMap.set(cityID, city);
      this.updateSelectedMetro('');
    }
  }

  function updateCity(id: string, name: string, population: number, featuredImage: string, notes: string) {
    const success: KyResponse = await this.citiesAPI.updateCity(id, name, population, featuredImage, notes);
    if (success.ok) {
      const city = this.citiesMap.get(id);
      this.citiesMap.set(id, { ...city, Name: name, Population: population, FeaturedImage: featuredImage });
    }
  }

  return {
    filteredCitiesMap,
    cities,
    citiesMap,
    selectedCity,
    selectedCityArea,
  };
}

export const CitiesContainer = createContainer(useCitiesStore);
