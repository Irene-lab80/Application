import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { platformApi } from './query';
import { TestSlice } from './slice';

const rootReducer = combineReducers({
  [platformApi.reducerPath]: platformApi.reducer,
  testState: TestSlice.tradingPointsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(platformApi.middleware),
  devTools: process.env.NODE_ENV === 'development',
});

export type TState = ReturnType<typeof store.getState>;
