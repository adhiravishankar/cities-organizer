import { makeObservable, observable } from 'mobx';
import { Metro } from '../interfaces/Metro';

export class AppStore {
  metrosMap: Map<number, Metro> = observable.map();

  constructor() {
    makeObservable(this, {
      metrosMap: observable,
    });
  }

}

