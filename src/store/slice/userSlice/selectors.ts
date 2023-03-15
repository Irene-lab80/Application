import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getUserState = (state: TState) => state.userState;

export const getUser = createSelector(getUserState, ({ user }) => user);
