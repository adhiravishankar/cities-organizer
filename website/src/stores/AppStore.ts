import { flow, makeObservable, observable } from 'mobx';

import { API } from '../apis/API';
import { Metro } from '../interfaces/Metro';

export class AppStore {
  api: API;

  modalOpen: boolean;

  metrosMap: Map<number, Metro> = observable.map();

  metrosPics: string[] = observable.array();

  constructor() {
    this.api = new API(process.env.BASE_URL);
    makeObservable(this, {
      modalOpen: observable,
      metrosMap: observable,
      fetchMetros: flow,
      editMetro: flow,
      uploadPicForMetro: flow,
    });
  }

  *fetchMetros() {
    const genericMetros: unknown = yield this.api.metros();
    const metros = genericMetros as Metro[];
    metros.forEach((metro: Metro) => this.metrosMap.set(metro.ID, metro));
  }

  *editMetro(id: number, name: string, extendedName: string, population: number) {
    const success: Response = yield this.api.editMetro(id, name, extendedName, population);
    if (success.ok) {
      const metro = this.metrosMap.get(id);
      this.metrosMap.set(id, { ...metro, Name: name, ExtendedName: extendedName, Population: population })
    }
  }

  *uploadPicForMetro(id: number, file: File) {
    console.log('file upload 3');
    const success: string = yield this.api.uploadPicForMetro(id, file);
    if (success && success.length === 0) {
      this.metrosPics.push(success);
    }
  }

}

