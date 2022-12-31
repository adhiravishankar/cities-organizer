import { KyResponse } from 'ky';
import { action, computed, flow, makeObservable, observable } from 'mobx';

import { API } from '../apis/API';
import { CitiesAPI } from '../apis/CitiesAPI';
import { MetroAPI } from '../apis/MetroAPI';
import { City } from '../interfaces/City';
import { DetailedCity } from '../interfaces/DetailedCity';
import { DetailedMetro } from '../interfaces/DetailedMetro';
import { DetailedNeighborhood } from '../interfaces/DetailedNeighborhood';
import { Metro } from '../interfaces/Metro';
import { Neighborhood } from '../interfaces/Neighborhood';


export class AppStore {

  api: API;

  metroAPI: MetroAPI;

  citiesAPI: CitiesAPI;

  selectedMetro: DetailedMetro;

  metrosMap: Map<string, Metro> = observable.map();

  get metroNamesMap(): Map<string, string> {
    const namesMap = new Map<string, string>();
    this.metrosMap.forEach((value: Metro, key: string) => namesMap.set(key, value.Name));
    return namesMap;
  }

  selectedCity: DetailedCity;

  citiesMap: Map<string, City> = observable.map();

  get filteredCitiesMap(): Map<string, string> {
    const namesMap = new Map<string, string>();
    this.citiesMap.forEach((city: City, key: string) => {
      if (city.MetroID === this.selectedMetroArea) namesMap.set(key, city.Name);
    });
    return namesMap;
  }

  selectedMetroArea: string;

  selectedNeighborhood: DetailedNeighborhood;

  neighborhoodsMap: Map<string, Neighborhood> = observable.map();


  editingModalOpen: boolean;

  uploadPicsModalOpen: boolean;

  constructor() {
    this.api = new API(process.env.BASE_URL);
    this.metroAPI = new MetroAPI(process.env.BASE_URL);
    this.citiesAPI = new CitiesAPI(process.env.BASE_URL);
    makeObservable(this, {
      citiesMap: observable,
      editingModalOpen: observable,
      editingModalVisibilityChange: action,
      fetchCities: flow,
      fetchMetro: flow,
      fetchMetros: flow,
      fetchNeighborhoods: flow,
      filteredCitiesMap: computed,
      initialize: flow,
      insertCity: flow,
      insertMetro: flow,
      insertNeighborhood: flow,
      metroNamesMap: computed,
      metrosMap: observable,
      neighborhoodsMap: observable,
      selectedCity: observable,
      selectedMetro: observable,
      selectedMetroArea: observable,
      updateCity: flow,
      updateSelectedMetro: action,
      uploadPicsModalOpen: observable,
      uploadPicsModalVisibilityChange: action,
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
    this.metrosMap.clear();
    metros.forEach((metro: Metro) => this.metrosMap.set(metro.ID, metro));
  }

  *fetchMetro(id: number) {
    const response: KyResponse = yield this.metroAPI.getMetro(id);
    this.selectedMetro = yield response.json<DetailedMetro>();
  }

  *insertMetro(name: string, extendedName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string) {
    const response: KyResponse = yield this.metroAPI.insertMetro(name, extendedName, metroSizeRank, population, featuredImage, notes);
    if (response.ok) {
      const metroID = yield response.text();
      const metro: Metro = { Name: name, ExtendedName: extendedName, MetroSizeRank: metroSizeRank, Population: population, FeaturedImage: featuredImage, ID: metroID, Notes: notes };
      this.metrosMap.set(metroID, metro);
    }
  }

  *updateMetro(id: string, name: string, extendedName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string) {
    const success: KyResponse = yield this.metroAPI.editMetro(id, name, extendedName, metroSizeRank, population, featuredImage, notes);
    if (success.ok) {
      const metro = this.metrosMap.get(id);
      this.metrosMap.set(id, { ...metro, Name: name, ExtendedName: extendedName, Population: population, FeaturedImage: featuredImage });
    }
  }

  updateSelectedMetro(metro: string) {
    this.selectedMetroArea = metro;
  }

  *fetchCities() {
    const response: KyResponse = yield this.citiesAPI.cities();
    const cities = yield response.json<City[]>();
    this.citiesMap.clear();
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

  *updateCity(id: string, name: string, population: number, featuredImage: string, notes: string) {
    const success: KyResponse = yield this.citiesAPI.updateCity(id, name, population, featuredImage, notes);
    if (success.ok) {
      const city = this.citiesMap.get(id);
      this.citiesMap.set(id, { ...city, Name: name, Population: population, FeaturedImage: featuredImage });
    }
  }

  *fetchNeighborhoods() {
    const response: KyResponse = yield this.api.neighborhoods();
    const neighborhoods: Neighborhood[] = yield response.json<Neighborhood[]>();
    neighborhoods.forEach((neighboorhood: Neighborhood) => this.neighborhoodsMap.set(neighboorhood.ID, neighboorhood));
  }

  *insertNeighborhood(neighborhood: Neighborhood) {
    const response: KyResponse = yield this.api.insertNeighborhood(neighborhood);
    if (response.ok) {
      const neighborhoodID = yield response.text();
      console.log(neighborhoodID);
    }
  }

  *uploadPic(id: string, file: File) {
    const response: KyResponse = yield this.api.uploadPic(id, file);
    const picID = yield response.text();
    console.log(picID);
    // todo add uploaded pic
  }

  editingModalVisibilityChange(visibility: boolean) {
    this.editingModalOpen = visibility;
  }

  uploadPicsModalVisibilityChange(visibility: boolean) {
    this.uploadPicsModalOpen = visibility;
  }

}
