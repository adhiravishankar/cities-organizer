import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { getMetros } from "../actions/MetroActions";
import { MetroService } from "../apis/metro.service";



@Injectable()
export class MetroEffects {

  constructor(private actions$: Actions, private $metrosAPI: MetroService, private store: Store) { }

  getMetros$ = createEffect(() => this.actions$.pipe(ofType(getMetros)))

}
