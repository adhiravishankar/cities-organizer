import {createAction, props} from "@ngrx/store";
import {City} from "../interfaces/City";

export const getCities = createAction('getCities', props<City>());


