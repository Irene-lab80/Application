import { createApi } from '@reduxjs/toolkit/query/react';
import { refreshTokenQuery } from './refreshTokenQuery';

export const platformApi = createApi({
  reducerPath: 'api',
  baseQuery: refreshTokenQuery,
  endpoints: () => ({}),
});
