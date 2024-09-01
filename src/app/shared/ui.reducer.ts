import { createReducer, on } from "@ngrx/store";
import * as actions from "./ui.actions";
import { Action } from '@ngrx/store';

export interface UIState {
  isLoading: boolean;
}

export const initialState: UIState = {
  isLoading: false
};

const _uiReducer = createReducer(
    initialState,
    on(actions.startLoading, state=> ({...state, isLoading: true})),
    on(actions.stopLoading, state=> ({...state, isLoading: false}))
);

export function uiReducer(state:UIState, action:Action) {
  return _uiReducer(state, action);
}


