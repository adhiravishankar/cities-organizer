import { createAction, props } from "@ngrx/store";

import { Neighborhood } from "../interfaces/Neighborhood";

export const getNeighborhoods = createAction('getNeighborhoods', props<Neighborhood>());


