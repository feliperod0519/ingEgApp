import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { uiReducer, UIState } from './shared/ui.reducer';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer as ActionReducer<UIState>,
    user: authReducer as ActionReducer<AuthState>
}