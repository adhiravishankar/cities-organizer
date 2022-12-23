import { flow, makeObservable, observable } from 'mobx';

import { API } from '../apis/API';
import { Metro } from '../interfaces/Metro';

export class AppStore {
  api: API;

  modalOpen: boolean;

  imagesUploadModalOpen: boolean;

  metrosMap: Map<number, Metro> = observable.map();

  pics: string[] = observable.array();

  constructor() {
    this.api = new API(process.env.BASE_URL);
    makeObservable(this, {
      imagesUploadModalOpen: observable,
      modalOpen: observable,
      metrosMap: observable,
      fetchMetros: flow,
      editMetro: flow,
      fetchMetroPics: flow,
      uploadPicForMetro: flow,
    });
  }

  *fetchMetros() {
    const genericMetros: unknown = yield this.api.metros();
    const metros = genericMetros as Metro[];
    metros.forEach((metro: Metro) => this.metrosMap.set(metro.ID, metro));
  }

  *fetchMetroPics(id: number) {
    const pics: unknown = yield this.api.getMetroPics(id);
    this.pics = pics as string[];
  }

  *editMetro(id: number, name: string, extendedName: string, population: number) {
    const success: Response = yield this.api.editMetro(id, name, extendedName, population);
    if (success.ok) {
      const metro = this.metrosMap.get(id);
      this.metrosMap.set(id, { ...metro, Name: name, ExtendedName: extendedName, Population: population })
    }
  }

  *uploadPicForMetro(id: number, file: File) {
    const success: string = yield this.api.uploadPicForMetro(id, file);
    if (success && success.length === 0) {
      this.fetchMetroPics(id);
    }
  }

}

