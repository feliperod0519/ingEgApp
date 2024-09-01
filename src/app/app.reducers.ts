import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { uiReducer, UIState } from './shared/ui.reducer';

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer as ActionReducer<UIState>
}