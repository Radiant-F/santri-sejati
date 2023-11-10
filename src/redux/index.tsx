import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import {apiSlice} from './api/apiSlice';
import yaumiReducer from './slices/yaumiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    yaumi: yaumiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
