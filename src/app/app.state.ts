import { AuthState } from "./auth/auth.state";
import { UIState } from "./shared/ui.reducer";

export interface AppState {
    ui: UIState,
    user: AuthState
}