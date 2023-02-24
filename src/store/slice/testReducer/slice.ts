import { createSlice } from '@reduxjs/toolkit';
import { testActions } from './actions';
import { TTest } from './entities';

const initialState = { count: 0 } as TTest;

const testSlice = createSlice({
  name: 'tradingPoints',
  initialState,
  reducers: testActions,
});

export const { setTestNumber } = testSlice.actions;
export const tradingPointsReducer = testSlice.reducer;
