import { KyResponse } from 'ky';
import { action, computed, flow, makeObservable, observable } from 'mobx';

import { CitiesAPI } from '../apis/CitiesAPI';
import { MetroAPI } from '../apis/MetroAPI';
import { NeighborhoodAPI } from '../apis/NeighborhoodAPI';
import { City } from '../interfaces/City';
import { DerivedNeighborhood } from '../interfaces/DerivedNeighborhood';
import { DetailedCity } from '../interfaces/DetailedCity';
import { DetailedMetro } from '../interfaces/DetailedMetro';
import { DetailedNeighborhood } from '../interfaces/DetailedNeighborhood';
import { Metro } from '../interfaces/Metro';
import { Neighborhood } from '../interfaces/Neighborhood';


export class AppStore {

  metroAPI: MetroAPI;

  citiesAPI: CitiesAPI;

  neighborhoodAPI: NeighborhoodAPI;

  selectedMetro: DetailedMetro;

  metrosArray: Metro[] = observable.array();

  metrosMap: Map<string, Metro> = observable.map();

  get metroNamesMap(): Map<string, string> {
    const namesMap = new Map<string, string>();
    this.metrosMap.forEach((value: Metro, key: string) => namesMap.set(key, value.Name));
    return namesMap;
  }

  selectedMetroArea: string;

  selectedCity: DetailedCity;

  citiesArray: City[] = observable.array();

  citiesMap: Map<string, City> = observable.map();

  get filteredCitiesMap(): Map<string, string> {
    const namesMap = new Map<string, string>();
    this.citiesMap.forEach((city: City, key: string) => {
      if (city.MetroID === this.selectedMetroArea) namesMap.set(key, city.Name);
    });
    return namesMap;
  }

  selectedCityArea: string;

  selectedNeighborhood: DetailedNeighborhood;

  neighborhoodsArray: DerivedNeighborhood[] = observable.array();

  neighborhoodsMap: Map<string, DerivedNeighborhood> = observable.map();

  constructor() {
    this.metroAPI = new MetroAPI();
    this.citiesAPI = new CitiesAPI();
    this.neighborhoodAPI = new NeighborhoodAPI();
    makeObservable(this, {
      citiesArray: observable,
      citiesMap: observable,
      fetchCity: flow,
      fetchCities: flow,
      fetchMetro: flow,
      fetchMetros: flow,
      fetchNeighborhood: flow,
      fetchNeighborhoods: flow,
      filteredCitiesMap: computed,
      initialize: flow,
      insertCity: flow,
      insertMetro: flow,
      insertNeighborhood: flow,
      metroNamesMap: computed,
      metrosArray: observable,
      metrosMap: observable,
      neighborhoodsArray: observable,
      neighborhoodsMap: observable,
      selectedCity: observable,
      selectedMetro: observable,
      selectedMetroArea: observable,
      updateCity: flow,
      updateMetro: flow,
      updateNeighborhood: flow,
      updateSelectedCity: action,
      updateSelectedMetro: action,
    });
  }

  *initialize() {
    yield this.fetchMetros();
    yield this.fetchCities();
    yield this.fetchNeighborhoods();
  }

  *fetchMetros() {
    const response: KyResponse = yield this.metroAPI.metros();
    this.metrosArray = yield response.json<Metro[]>();
    this.metrosMap.clear();
    this.metrosArray.forEach((metro: Metro) => this.metrosMap.set(metro.ID, metro));
  }

  *fetchMetro(id: string) {
    const response: KyResponse = yield this.metroAPI.getMetro(id);
    this.selectedMetro = yield response.json<DetailedMetro>();
  }

  *insertMetro(name: string, extendedName: string, shortName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string) {
    const response: KyResponse = yield this.metroAPI.insertMetro(name, extendedName, shortName, metroSizeRank, population, featuredImage, notes);
    if (response.ok) {
      const metroID = yield response.text();
      const metro: Metro = { Name: name, ExtendedName: extendedName, ShortName: shortName, MetroSizeRank: metroSizeRank, Population: population, FeaturedImage: featuredImage, ID: metroID, Notes: notes };
      this.metrosMap.set(metroID, metro);
    }
  }

  *updateMetro(id: string, name: string, extendedName: string, shortName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string) {
    const success: KyResponse = yield this.metroAPI.editMetro(id, name, extendedName, shortName, metroSizeRank, population, featuredImage, notes);
    if (success.ok) {
      const metro = this.metrosMap.get(id);
      this.metrosMap.set(id, { ...metro, Name: name, ExtendedName: extendedName, ShortName: shortName, Population: population, FeaturedImage: featuredImage });
    }
  }

  updateSelectedMetro(metro: string) {
    this.selectedMetroArea = metro;
  }

  updateSelectedCity(city: string) {
    this.selectedCityArea = city;
  }

  *fetchCities() {
    const response: KyResponse = yield this.citiesAPI.cities();
    this.citiesArray = yield response.json<City[]>();
    this.citiesMap.clear();
    this.citiesArray.forEach((city: City) => this.citiesMap.set(city.ID, city));
  }

  *fetchCity(id: string) {
    const response: KyResponse = yield this.citiesAPI.readCity(id);
    this.selectedCity = yield response.json<DetailedCity>();
  }

  *insertCity(name: string, metroID: string, population: number, featuredImage: string, notes: string) {
    const response: KyResponse = yield this.citiesAPI.insertCity(name, metroID, population, featuredImage, notes);
    if (response.ok) {
      const cityID = yield response.text();
      const city: City = { Name: name, MetroID: metroID, Population: population, FeaturedImage: featuredImage, ID: cityID, Notes: notes };
      this.citiesMap.set(cityID, city);
      this.updateSelectedMetro('');
    }
  }

  *updateCity(id: string, name: string, population: number, featuredImage: string, notes: string) {
    const success: KyResponse = yield this.citiesAPI.updateCity(id, name, population, featuredImage, notes);
    if (success.ok) {
      const city = this.citiesMap.get(id);
      this.citiesMap.set(id, { ...city, Name: name, Population: population, FeaturedImage: featuredImage });
    }
  }

  *fetchNeighborhoods() {
    const response: KyResponse = yield this.neighborhoodAPI.neighborhoods();
    this.neighborhoodsArray = yield response.json<DerivedNeighborhood[]>();
    this.neighborhoodsMap.clear();
    this.neighborhoodsArray.forEach((neighboorhood: DerivedNeighborhood) => this.neighborhoodsMap.set(neighboorhood.ID, neighboorhood));
  }

  *fetchNeighborhood(id: string) {
    const response: KyResponse = yield this.neighborhoodAPI.getNeighborhood(id);
    this.selectedNeighborhood = yield response.json<DetailedNeighborhood>();
  }

  *insertNeighborhood(neighborhood: Neighborhood) {
    const response: KyResponse = yield this.neighborhoodAPI.insertNeighborhood(neighborhood);
    if (response.ok) {
      const neighborhoodID = yield response.text();
      this.updateSelectedCity('');
      this.updateSelectedMetro('');
    }
  }

  *updateNeighborhood(neighborhood: Neighborhood) {
    const response: KyResponse = yield this.neighborhoodAPI.updateNeighborhood(neighborhood);
    if (response.ok) {
      const neighborhoodID = yield response.text();
    }
  }

}
