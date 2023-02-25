import { platformApi } from '../platformApi';

export const extendedApi = platformApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<any, void>({
      query: () => ({
        url: '/users',
      }),
    }),
    getOnePost: build.query<any, string>({
      query: (id: string) => ({
        url: `/posts/${id}`,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetOnePostQuery } = extendedApi;
