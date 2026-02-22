import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    name: string, 
    email: string, 
    picture: string | null, 
    isAuthenticated: boolean, 
}

const initialState: AuthState = {
    name: "", 
    email: "", 
    picture: null, 
    isAuthenticated: false, 
}

const authSlice = createSlice({
    name: "auth", 
    initialState, 
    reducers: {
        setUser: (state, action: PayloadAction<AuthState>) => {
            state.name = action.payload.name; 
            state.email = action.payload.email; 
            state.picture = action.payload.picture; 
            state.isAuthenticated = true; 
        }, 
        logout: (state) => {
            state.name = ""; 
            state.email = ""; 
            state.picture = null; 
            state.isAuthenticated = false; 
        }
    }
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;