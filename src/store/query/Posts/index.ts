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
}

export const extendedApi = platformApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<any, any>({
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
        return {
        url: `/products?${params}`,
      };
},
      transformResponse: (response: any, meta: any) => (
        { response, totalCount: Number(meta?.response?.headers.get('X-Total-Count')) }
        ),
        providesTags: ['Posts'],
    }),
    getFilteredProducts: build.query<any, any>({
      query: ({ _page, _limit, _sort, _order, q, publish }) => ({
        url: '/products',
        params: { _page, _limit, _sort, _order, q, publish },
      }),
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
    updateViews: build.mutation<any, {id: string, payload: any}>({
      query: ({ id, payload }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: payload,
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
  useLazyGetFilteredProductsQuery,
} = extendedApi;
