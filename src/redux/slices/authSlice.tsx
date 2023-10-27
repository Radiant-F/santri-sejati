import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, {payload}) {
      state.token = payload;
    },
  },
});

export const {setToken} = authSlice.actions;

export default authSlice.reducer;
