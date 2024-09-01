import { createAction, props } from "@ngrx/store";

export const setUser = createAction('[Auth] setUser', props<{ user: string }>());
export const resetUser = createAction('[Auth] resetUser');