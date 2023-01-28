import { createReducer, on } from "@ngrx/store";

import { setTitle } from "../actions/TitleAction";

export interface TitleState {
  title: string;
}

export const initialState: TitleState = {
  title: '',
};

export const titleReducer = createReducer(initialState, on(setTitle, (state, { title }) => ({ title })));
