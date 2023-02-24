import { platformApi } from '../platformApi';

export type TTestData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const extendedApi = platformApi.injectEndpoints({
  endpoints: (build) => ({
    getTestData: build.query<TTestData, { id: number }>({
      query: () => ({ url: '/todos/1', method: 'GET' }),
      transformResponse: (data: any) => data.map(),
      keepUnusedDataFor: 0,
    }),
  }),

  overrideExisting: false,
});

export const { useGetTestDataQuery } = extendedApi;
