import { KyResponse } from 'ky';
import {action, computed, flow, makeObservable, observable} from 'mobx';

import { API } from '../apis/API';
import { CitiesAPI } from '../apis/CitiesAPI';
import { MetroAPI } from '../apis/MetroAPI';
import { City } from '../interfaces/City';
import { Metro } from '../interfaces/Metro';
import { Neighborhood } from '../interfaces/Neighborhood';


export class AppStore {

  api: API;

  metroAPI: MetroAPI;

  citiesAPI: CitiesAPI;

  metrosMap: Map<string, Metro> = observable.map();

  citiesMap: Map<string, City> = observable.map();

  selectedMetroArea: string;

  neighborhoodsMap: Map<string, Neighborhood> = observable.map();

  get filteredCitiesMap(): Map<string, string> {
    const namesMap = new Map<string, string>();
    this.citiesMap.forEach((city: City, key: string) => {
      if (city.MetroID === this.selectedMetroArea) namesMap.set(key, city.Name);
    });
    return namesMap;
  }

  get metroNamesMap(): Map<string, string> {
    const namesMap = new Map<string, string>();
    this.metrosMap.forEach((value: Metro, key: string) => namesMap.set(key, value.Name));
    return namesMap;
  }

  constructor() {
    this.api = new API(process.env.BASE_URL);
    this.metroAPI = new MetroAPI(process.env.BASE_URL);
    this.citiesAPI = new CitiesAPI(process.env.BASE_URL);
    makeObservable(this, {
      citiesMap: observable,
      fetchCities: flow,
      fetchMetros: flow,
      fetchNeighborhoods: flow,
      filteredCitiesMap: computed,
      initialize: flow,
      insertCity: flow,
      insertMetro: flow,
      metroNamesMap: computed,
      metrosMap: observable,
      neighborhoodsMap: observable,
      selectedMetroArea: observable,
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
    const metros: Metro[] = yield response.json<Metro[]>();
    metros.forEach((metro: Metro) => this.metrosMap.set(metro.ID, metro));
  }

  *insertMetro(name: string, extendedName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string) {
    const response: KyResponse = yield this.metroAPI.insertMetro(name, extendedName, metroSizeRank, population, featuredImage, notes);
    if (response.ok) {
      const metroID = yield response.text();
      const metro: Metro = { Name: name, ExtendedName: extendedName, MetroSizeRank: metroSizeRank, Population: population, FeaturedImage: featuredImage, ID: metroID, Notes: notes };
      this.metrosMap.set(metroID, metro);
    }
  }

  updateSelectedMetro(metro: string) {
    this.selectedMetroArea = metro;
  }

  *fetchCities() {
    const citiesArray: unknown = yield this.citiesAPI.cities();
    const cities = citiesArray as City[];
    cities.forEach((city: City) => this.citiesMap.set(city.ID, city));
  }

  *insertCity(name: string, metroID: string, population: number, featuredImage: string, notes: string) {
    const response: KyResponse = yield this.citiesAPI.insertCity(name, metroID, population, featuredImage, notes);
    if (response.ok) {
      const cityID = yield response.text();
      const city: City = { Name: name, MetroID: metroID, Population: population, FeaturedImage: featuredImage, ID: cityID, Notes: notes };
      this.citiesMap.set(cityID, city);
    }
  }

  *fetchNeighborhoods() {
    const response: KyResponse = yield this.api.neighborhoods();
    const neighborhoods: Neighborhood[] = yield response.json<Neighborhood[]>();
    neighborhoods.forEach((neighboorhood: Neighborhood) => this.neighborhoodsMap.set(neighboorhood.ID, neighboorhood));
  }

}
