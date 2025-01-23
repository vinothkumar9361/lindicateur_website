// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import astromindReducer from './slices/slice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    lindicateur: astromindReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
