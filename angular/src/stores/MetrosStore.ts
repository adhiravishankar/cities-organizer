import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";

import { MetroService } from "../apis/metro.service";
import { MetroState } from "../interfaces/MetroState";

@Injectable()
export class MetrosStore extends ObservableStore<MetroState> {
  metroService: MetroService;

  constructor(metroService: MetroService) {
    const initialState: MetroState = { metros: undefined, selectedMetro: undefined }
    super({ trackStateHistory: true });
    this.setState(initialState, 'INIT_STATE');
    this.metroService = metroService;
  }

  // getMetros() {
  //   const { metros } = this.getState();
  //   if (metros !== undefined) {
  //     return of(metros);
  //   }
  //
  //   let metroList: Metro[] = [];
  //   const metroResponse = this.metroService.metros();
  //   metroResponse.subscribe(((data: Metro[]) => metroList = { ...data }));
  //   this.setState({ metros: metroList });
  //   return of(metroList);
  // }

}

