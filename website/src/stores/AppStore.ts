import { action, flow, makeObservable, observable } from 'mobx';

import { API } from '../apis/API';
import {DetailedMetro, Metro} from '../interfaces/Metro';
import {DetailedCity} from "../interfaces/DetailedCity";

export class AppStore {
  api: API;

  editingModalOpen: boolean;

  uploadPicsModalOpen: boolean;

  imagesUploadModalOpen: boolean;

  metrosMap: Map<number, Metro> = observable.map();

  pics: string[] = observable.array();

  selectedMetro: DetailedMetro;

  selectedCity: DetailedCity;

  constructor() {
    this.api = new API(process.env.BASE_URL);
    makeObservable(this, {
      imagesUploadModalOpen: observable,
      editingModalOpen: observable,
      metrosMap: observable,
      selectedMetro: observable,
      selectedCity: observable,
      uploadPicsModalOpen: observable,
      fetchMetros: flow,
      fetchMetro: flow,
      fetchCity: flow,
      editMetro: flow,
      fetchMetroPics: flow,
      uploadPicForMetro: flow,
      editingModalVisibilityChange: action,
    });
  }

  *fetchMetros() {
    const genericMetros: unknown = yield this.api.metros();
    const metros = genericMetros as Metro[];
    metros.forEach((metro: Metro) => this.metrosMap.set(metro.ID, metro));
  }

  *fetchMetro(id: number) {
    const metro = yield this.api.getMetro(id);
    this.selectedMetro = metro as DetailedMetro;
    this.pics = this.selectedMetro.Pics;
  }

  *fetchCity(id: number) {
    const city = yield this.api.getCity(id);
    this.selectedCity = city as DetailedCity;
    console.log(this.selectedCity);
    this.pics = this.selectedCity.Pics;
  }

  *fetchMetroPics(id: number) {
    const pics: unknown = yield this.api.getMetroPics(id);
    this.pics = pics as string[];
  }

  *editMetro(id: number, name: string, extendedName: string, population: number, featuredImage: string) {
    const success: Response = yield this.api.editMetro(id, name, extendedName, population, featuredImage);
    if (success.ok) {
      const metro = this.metrosMap.get(id);
      this.metrosMap.set(id, { ...metro, Name: name, ExtendedName: extendedName, Population: population, FeaturedImage: featuredImage });
    }
  }

  *uploadPicForMetro(id: number, file: File) {
    const success: string = yield this.api.uploadPicForMetro(id, file);
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

