import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TFilters = {
  _order: string;
  _sort: string;
  _limit: number;
  _page: number;
  q: string;
  tags?: number[];
  publish?: number[];
}

const initialState = {
  _page: 1,
  _limit: 12,
  _sort: '',
  _order: '',
  q: '',
};

const filtersMainSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    resetFilters: () => initialState,
    setSort(state, action: PayloadAction<any>) {
      return { ...state, _sort: action.payload };
    },
    setOrder(state, action: PayloadAction<any>) {
      return { ...state, _order: action.payload };
    },
    setSearch(state, action: PayloadAction<any>) {
      return { ...state, q: action.payload };
    },
    setPage(state, action: PayloadAction<any>) {
      return { ...state, _page: action.payload };
    },
    setLimit(state, action: PayloadAction<any>) {
      return { ...state, _limit: action.payload };
    },
    setTags(state, action: PayloadAction<any>) {
      return { ...state, tags: action.payload };
    },
    setPublish(state, action: PayloadAction<any>) {
      return { ...state, publish: action.payload };
    },
  },
});

export const {
  resetFilters,
  setOrder,
  setSort,
  setSearch,
  setPage,
  setTags,
  setPublish,
  setLimit,
} = filtersMainSlice.actions;

export const filtersMainReducer = filtersMainSlice.reducer;
