import { platformApi } from '../platformApi';

type TAuth = {
  email: string;
  password: string;
}

type TReg = {
  sentMessageId: string;
}

type TVeryfy = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }
  accessToken: string;
}

export const extendedApi = platformApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<TReg, TAuth>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
    loginUser: build.mutation<any, TAuth>({
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
