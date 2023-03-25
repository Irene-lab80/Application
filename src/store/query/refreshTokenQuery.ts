import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { cookies } from '../../shared/lib/hooks/useAuth';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://intriguing-ultra-mango.glitch.me',
  // baseUrl: 'http://localhost:3000',
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = cookies.get('token');
    if (token) {
      headers.set('Authorization', `Bearere ${token}`);
    }
  },
});

export const refreshTokenQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};
