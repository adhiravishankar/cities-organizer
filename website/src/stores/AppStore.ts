import { flow, makeObservable, observable } from 'mobx';
import { Metro } from '../interfaces/Metro';
import { API } from '../apis/API';

export class AppStore {
  api: API;

  metrosMap: Map<number, Metro> = observable.map();

  constructor() {
    this.api = new API(process.env.BASE_URL);
    makeObservable(this, {
      metrosMap: observable,
      fetchMetros: flow,
    });
  }

  *fetchMetros() {
    const genericMetros: unknown = yield this.api.metros();
    const metros = genericMetros as Metro[];
    metros.forEach((metro: Metro) => this.metrosMap.set(metro.ID, metro));
  }

}
