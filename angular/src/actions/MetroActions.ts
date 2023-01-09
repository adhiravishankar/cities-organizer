import {createAction, props} from "@ngrx/store";
import {Metro} from "../interfaces/Metro";

export const getMetros = createAction('getMetros', props<Metro>());


