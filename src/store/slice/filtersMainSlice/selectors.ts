import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getFiltersMainState = (state: TState) => state.filtersMainState;

export const getFiltersMain = createSelector(getFiltersMainState, (state) => state);
