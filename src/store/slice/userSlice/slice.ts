import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TUser = {
  id: string | null;
  email: string | null;
  name: string | null;
  secondName: string | null;
}

type TUserState = {
  user: TUser;
  accessToken: string | null;
}

const initialState: TUserState = {
  user: {
    id: null,
    email: null,
    name: null,
    secondName: null,
  },
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    setUser(state, action: PayloadAction<TUser>) {
      return { ...state, user: action.payload };
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
