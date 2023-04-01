import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getFiltersState = (state: TState) => state.filtersState;

export const getFilters = createSelector(getFiltersState, (state) => state);
