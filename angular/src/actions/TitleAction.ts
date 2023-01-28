import { createAction, props } from "@ngrx/store";

export const setTitle = createAction('setTitle', props<{ title: string }>());
