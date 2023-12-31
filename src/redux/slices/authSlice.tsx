import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
  user: {
    email: string;
    id: number;
    name: string;
    role: string;
  };
}

const initialState: AuthState = {
  token: '',
  user: {
    email: 'placeholder@email.com',
    id: 0,
    name: 'Placeholder',
    role: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUser(state, {payload}) {
      state.token = payload.token;
      state.user = payload.user;
    },
  },
});

export const {setToken, setUser} = authSlice.actions;

export default authSlice.reducer;
