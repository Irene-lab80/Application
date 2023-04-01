/* eslint-disable no-underscore-dangle */
import { platformApi } from '../platformApi';

export type TProduct = {
  date: string;
  description: string;
  id: string;
  location: string;
  price: number;
  publish: number;
  src: string;
  tag: string;
  tel: string;
  title: string;
  username: string;
  views: number;
  userId: string | number;
}

export const extendedApi = platformApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<{response: TProduct[], totalCount: number}, any>({
      query: (args) => {
        const p = {
          _page: args._page,
          _limit: args._limit,
          _sort: args._sort,
          _order: args._order,
          q: args.q,
        };

        const params = new URLSearchParams(p);

        if (args.publish) {
          args.publish.forEach((el: string) => {
            params.append('publish', el);
          });
        }

        if (args.tags) {
          args.tags.forEach((el: string) => {
            params.append('tag', el);
          });
        }

        if (args.userId) {
          params.append('userId', args.userId);
        }

        return {
        url: `/products?${params}`,
      };
},
      transformResponse: (response: any, meta: any) => (
        { response, totalCount: Number(meta?.response?.headers.get('X-Total-Count')) }
        ),
        providesTags: ['Posts'],
    }),
    getOneProduct: build.query<TProduct, any>({
      query: (args) => {
        const { id } = args;
        return {
        url: `/products/${id}`,
        params: id,
      };
      },
    }),
    updateProduct: build.mutation<TProduct, {id: string, payload: TProduct}>({
      query: ({ id, payload }) => ({
        url: `/products/${id}`,
        body: payload,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Posts'],
    }),
    updateViews: build.mutation<TProduct, {id: string, payload: {views: number}}>({
      query: ({ id, payload }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    createProduct: build.mutation<TProduct, TProduct>({
      query: (payload) => ({
        url: '/products',
        body: payload,
        method: 'POST',
      }),
      invalidatesTags: ['Posts'],
    }),
    deleteProduct: build.mutation<TProduct, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOneProductQuery,
  useLazyGetOneProductQuery,
  useCreateProductMutation,
  useUpdateViewsMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = extendedApi;
