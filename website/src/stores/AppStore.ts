import { action, computed, flow, makeObservable, observable } from 'mobx';

import { API } from '../apis/API';
import { CitiesAPI } from '../apis/CitiesAPI';
import { MetroAPI } from '../apis/MetroAPI';
import { City, DetailedCity } from '../interfaces/City';
import { DetailedMetro, Metro } from '../interfaces/Metro';
import { DetailedNeighborhood, Neighborhood } from '../interfaces/Neighborhood';
import {CitiesAPI} from "../apis/CitiesAPI";

export class AppStore {
  api: API;

  metroAPI: MetroAPI;

  citiesAPI: CitiesAPI;

  editingModalOpen: boolean;

  uploadPicsModalOpen: boolean;

  imagesUploadModalOpen: boolean;

  metrosMap: Map<number, Metro> = observable.map();

  get metroNamesMap(): Map<number, string> {
    const namesMap = new Map<number, string>();
    this.metrosMap.forEach((value: Metro, key: number) => namesMap.set(key, value.Name));
    return namesMap;
  }

  citiesMap: Map<number, City> = observable.map();

  selectedMetroArea: number;

  get filteredCitiesMap(): Map<number, string> {
    const namesMap = new Map<number, string>();
    this.citiesMap.forEach((city: City, key: number) => {
      if (city.MetroID === this.selectedMetroArea) namesMap.set(key, city.Name);
    });
    return namesMap;
  }

  neighborhoodsMap: Map<number, Neighborhood> = observable.map();

  pics: string[] = observable.array();

  selectedMetro: DetailedMetro;

  selectedCity: DetailedCity;

  selectedNeighborhood: DetailedNeighborhood;

  constructor() {
    this.api = new API(process.env.BASE_URL);
    this.metroAPI = new MetroAPI(process.env.BASE_URL);
    this.citiesAPI = new CitiesAPI(process.env.BASE_URL);
    makeObservable(this, {
      imagesUploadModalOpen: observable,
      editingModalOpen: observable,
      metrosMap: observable,
      citiesMap: observable,
      neighborhoodsMap: observable,
      selectedMetro: observable,
      selectedCity: observable,
      selectedNeighborhood: observable,
      uploadPicsModalOpen: observable,
      metroNamesMap: computed,
      initialize: flow,
      fetchMetros: flow,
      fetchCities: flow,
      fetchNeighborhoods: flow,
      fetchMetro: flow,
      fetchCity: flow,
      fetchNeighborhood: flow,
      editMetro: flow,
      fetchMetroPics: flow,
      uploadPicForMetro: flow,
      uploadPicForCity: flow,
      uploadPicForNeighborhood: flow,
      editingModalVisibilityChange: action,
    });
  }

  *initialize() {
    yield this.fetchMetros();
    yield this.fetchCities();
    yield this.fetchNeighborhoods();
  }

  *fetchMetros() {
    const genericMetros: unknown = yield this.metroAPI.metros();
    const metros = genericMetros as Metro[];
    metros.forEach((metro: Metro) => this.metrosMap.set(metro.ID, metro));
  }

  *fetchCities() {
    const citiesArray: unknown = yield this.citiesAPI.cities();
    const cities = citiesArray as City[];
    cities.forEach((city: City) => this.citiesMap.set(city.ID, city));
  }

  *fetchNeighborhoods() {
    const neighborhoodsArray: unknown = yield this.api.neighborhoods();
    const neighborhoods = neighborhoodsArray as Neighborhood[];
    neighborhoods.forEach((neighboorhood: Neighborhood) => this.neighborhoodsMap.set(neighboorhood.ID, neighboorhood));
  }

  *fetchMetro(id: number) {
    const metro = yield this.metroAPI.getMetro(id);
    this.selectedMetro = metro as DetailedMetro;
    this.pics = this.selectedMetro.Pics;
  }

  *fetchCity(id: number) {
    const city = yield this.citiesAPI.getCity(id);
    this.selectedCity = city as DetailedCity;
    this.pics = this.selectedCity.Pics;
  }

  *fetchNeighborhood(id: number) {
    const neighborhood = yield this.api.getNeighborhood(id);
    this.selectedNeighborhood = neighborhood as DetailedNeighborhood;
    this.pics = this.selectedNeighborhood.Pics;
  }

  *fetchMetroPics(id: number) {
    const pics: unknown = yield this.metroAPI.getMetroPics(id);
    this.pics = pics as string[];
  }

  *insertCity(name: string, metroID: number, population: number, featuredImage: string) {
    yield this.citiesAPI.insertCity(name, metroID, population, featuredImage);
  }

  *editCity(id: number, name: string, population: number, featuredImage: string) {
    const success: Response = yield this.citiesAPI.editCity(id, name, population, featuredImage);
    if (success.ok) {
      const city = this.citiesMap.get(id);
      this.citiesMap.set(id, { ...city, Name: name, Population: population, FeaturedImage: featuredImage });
    }
  }

  *uploadPicForMetro(id: number, file: File) {
    const success: string = yield this.metroAPI.uploadPicForMetro(id, file);
    if (success && success.length === 0) {
      this.fetchMetroPics(id);
    }
  }

  *insertMetro(name: string, extendedName: string, population: number, featuredImage: string) {
    yield this.metroAPI.insertMetro(name, extendedName, population, featuredImage);
  }

  *editMetro(id: number, name: string, extendedName: string, population: number, featuredImage: string) {
    const success: Response = yield this.metroAPI.editMetro(id, name, extendedName, population, featuredImage);
    if (success.ok) {
      const metro = this.metrosMap.get(id);
      this.metrosMap.set(id, { ...metro, Name: name, ExtendedName: extendedName, Population: population, FeaturedImage: featuredImage });
    }
  }

  *uploadPicForCity(id: number, file: File) {
    const success: string = yield this.citiesAPI.uploadPicForCity(id, file);
    if (success && success.length === 0) {
      this.fetchMetroPics(id);
    }
  }

  *uploadPicForNeighborhood(id: number, file: File) {
    const success: string = yield this.api.uploadPicForNeighborhood(id, file);
    if (success && success.length === 0) {
      this.fetchMetroPics(id);
    }
  }

  editingModalVisibilityChange(visibility: boolean) {
    this.editingModalOpen = visibility;
  }

  uploadPicsModalVisibilityChange(visibility: boolean) {
    this.uploadPicsModalOpen = visibility;
  }

}

