import { TUser } from 'store/slice/userSlice/slice';
import { platformApi } from '../platformApi';

export type TAuth = {
  email: string;
  password: string;
}

export type TAuthResponse = {
  acessToken: string;
  user: TUser;
}

export type TReg = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const extendedApi = platformApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<TReg, TReg>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
    loginUser: build.mutation<TAuthResponse, TAuth>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = extendedApi;
