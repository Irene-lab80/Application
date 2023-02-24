import { PayloadAction } from '@reduxjs/toolkit';
import { TTest } from './entities';

export const testActions = {
  setTestNumber(state: TTest, { payload }: PayloadAction<number>) {
    return { ...state, count: payload };
  },
};
