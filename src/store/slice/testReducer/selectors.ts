import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getTestState = (state: TState) => state.testState;

export const getTestCount = createSelector(getTestState, ({ count }) => count);
