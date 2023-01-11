import { KyResponse } from 'ky';
import { action, computed, flow, makeObservable, observable } from 'mobx';

import { API } from '../apis/API';
import { CitiesAPI } from '../apis/CitiesAPI';
import { MetroAPI } from '../apis/MetroAPI';
import { City } from '../interfaces/City';
import { DerivedNeighborhood } from '../interfaces/DerivedNeighborhood';
import { DetailedCity } from '../interfaces/DetailedCity';
import { DetailedMetro } from '../interfaces/DetailedMetro';
import { DetailedNeighborhood } from '../interfaces/DetailedNeighborhood';
import { Metro } from '../interfaces/Metro';
import { Neighborhood } from '../interfaces/Neighborhood';


export class AppStore {

  api: API;

  metroAPI: MetroAPI;

  citiesAPI: CitiesAPI;

  aboutMap: Map<string, string> = observable.map();

  selectedMetro: DetailedMetro;

  metrosArray: Metro[] = observable.array();

  metrosMap: Map<string, Metro> = observable.map();

  get metroNamesMap(): Map<string, string> {
    const namesMap = new Map<string, string>();
    this.metrosMap.forEach((value: Metro, key: string) => namesMap.set(key, value.Name));
    return namesMap;
  }

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

  selectedMetroArea: string;

  selectedNeighborhood: DetailedNeighborhood;

  neighborhoodsArray: DerivedNeighborhood[] = observable.array();

  neighborhoodsMap: Map<string, DerivedNeighborhood> = observable.map();

  editingModalOpen: boolean;

  uploadPicsModalOpen: boolean;

  constructor() {
    this.api = new API(process.env.BASE_URL);
    this.metroAPI = new MetroAPI(process.env.BASE_URL);
    this.citiesAPI = new CitiesAPI(process.env.BASE_URL);
    makeObservable(this, {
      about: flow,
      aboutMap: observable,
      citiesArray: observable,
      citiesMap: observable,
      editingModalOpen: observable,
      editingModalVisibilityChange: action,
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
      updateSelectedMetro: action,
      uploadPic: flow,
      uploadPicsModalOpen: observable,
      uploadPicsModalVisibilityChange: action,
    });
  }

  *initialize() {
    yield this.fetchMetros();
    yield this.fetchCities();
    yield this.fetchNeighborhoods();
  }

  *about() {
    const response: KyResponse = yield this.api.about();
    const aboutText: Record<string, string> = yield response.json<Record<string, string>>();
    Object.entries(aboutText).forEach(([key, value]: [string, string]) => this.aboutMap.set(key, value));
    this.aboutMap.set('Frontend', 'React');
    this.aboutMap.set('Store', 'MobX');
    this.aboutMap.set('Router', 'React Router');
    this.aboutMap.set('Styling Frameworks', 'Bootstrap & Material UI');
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
    this.neighborhoodsArray = yield response.json<DerivedNeighborhood[]>();
    this.neighborhoodsMap.clear();
    this.neighborhoodsArray.forEach((neighboorhood: DerivedNeighborhood) => this.neighborhoodsMap.set(neighboorhood.ID, neighboorhood));
  }

  *fetchNeighborhood(id: string) {
    const response: KyResponse = yield this.api.getNeighborhood(id);
    this.selectedNeighborhood = yield response.json<DetailedNeighborhood>();
  }

  *insertNeighborhood(neighborhood: Neighborhood) {
    const response: KyResponse = yield this.api.insertNeighborhood(neighborhood);
    if (response.ok) {
      const neighborhoodID = yield response.text();
    }
  }

  *updateNeighborhood(neighborhood: Neighborhood) {
    const response: KyResponse = yield this.api.updateNeighborhood(neighborhood);
    if (response.ok) {
      const neighborhoodID = yield response.text();
    }
  }

  *uploadPic(id: string, file: File) {
    const response: KyResponse = yield this.api.uploadPic(id, file);
    return yield response.text();
  }

  editingModalVisibilityChange(visibility: boolean) {
    this.editingModalOpen = visibility;
  }

  uploadPicsModalVisibilityChange(visibility: boolean) {
    this.uploadPicsModalOpen = visibility;
  }

}
