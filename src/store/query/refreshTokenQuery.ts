import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { platformApi } from './platformApi';

const baseQuery = fetchBaseQuery({
  // baseUrl: 'https://tourmaline-past-hall.glitch.me',
  baseUrl: 'http://localhost:3000',
});

export const refreshTokenQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 429) {
    const refreshResult: any = await baseQuery('/users/refresh', api, extraOptions);
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(platformApi.util.resetApiState());
    }
  }
  return result;
};
