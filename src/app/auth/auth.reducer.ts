import { createReducer, on, props, Action } from "@ngrx/store";
import { setUser, resetUser } from "./auth.actions";
import { AuthState } from "./auth.state";

export const initialState: AuthState = {
    user: 'dee_znuts@only-joking.com'
}

const _authReducer = createReducer(
    initialState,
    on(setUser, (state, props)=> {
        return { ...state, user: props.user };
    }),
    on(resetUser, state => ({ ...state, user: 'dee_znuts@only-joking.com' }))
);

export function authReducer(state:AuthState, action:Action) {
    return _authReducer(state, action);
}
