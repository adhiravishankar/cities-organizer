import { KyResponse } from 'ky';
import { useMemo, useState } from 'react';
import { SWRResponse } from 'swr';
import { createContainer, useContainer } from 'unstated-next';
import { useMap } from 'usehooks-ts';

import { CitiesAPI } from '../apis/CitiesAPI';
import { City } from '../interfaces/City';
import { DetailedCity } from '../interfaces/DetailedCity';
import { MetrosContainer } from './MetrosStore';

export function useCitiesStore() {
  const MetrosStore = useContainer(MetrosContainer);
  const citiesAPI = new CitiesAPI();

  const [cities, setCities] = useState<City[]>([]);
  const [citiesMap, setCitiesMap] = useMap<string, City>();
  const [selectedCity, setSelectedCity] = useState<DetailedCity>(null);
  const [selectedCityArea, setSelectedCityArea] = useState<string>(null);
  
  const filteredCitiesMap = useMemo(() => {
    const namesMap = new Map<string, string>();
    citiesMap.forEach((city: City, key: string) => {
      if (city.MetroID === MetrosStore.selectedMetroArea) namesMap.set(key, city.Name);
    });
    return namesMap;
  }, [citiesMap]);

  async function fetchCities() {
    const response: SWRResponse = await citiesAPI.cities();
    const data = response.data as City[];
    setCities(data);
    setCitiesMap.reset();
    data.forEach((city: City) => setCitiesMap.set(city.ID, city));
  }

  async function fetchCity(id: string) {
    const response: SWRResponse = await citiesAPI.readCity(id);
    setSelectedCity(response.data as DetailedCity);
  }

  async function insertCity(name: string, metroID: string, population: number, featuredImage: string, notes: string) {
    const response: KyResponse = await citiesAPI.insertCity(name, metroID, population, featuredImage, notes);
    if (response.ok) {
      const cityID = await response.text();
      const city: City = {
        Name: name,
        MetroID: metroID,
        Population: population,
        FeaturedImage: featuredImage,
        ID: cityID,
        Notes: notes,
      };
      setCitiesMap.set(cityID, city);
      MetrosStore.setSelectedMetroArea('');
    }
  }

  async function updateCity(id: string, name: string, population: number, featuredImage: string, notes: string) {
    const success: KyResponse = await citiesAPI.updateCity(id, name, population, featuredImage, notes);
    if (success.ok) {
      const city = citiesMap.get(id);
      setCitiesMap.set(id, { ...city, Name: name, Population: population, FeaturedImage: featuredImage });
    }
  }

  return {
    cities,
    citiesMap,
    fetchCities,
    filteredCitiesMap,
    insertCity,
    selectedCity,
    selectedCityArea,
    setSelectedCityArea,
    updateCity,
  };
}

export const CitiesContainer = createContainer(useCitiesStore);
