import { platformApi } from '../platformApi';

type TProduct = {
  date: string;
  description: string;
  id: string;
  location: string;
  price: number;
  publish: string;
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
      query: (page) => ({
        url: '/products',
        params: { _page: page, _limit: 12 },
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
    updateProduct: build.mutation<TProduct, any>({
      query: ({ id, payload }) => ({
        url: `/products/${id}`,
        body: payload,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    // updateViews: build.mutation<any, any>({
    //   query: (id: any, body: any) => ({
    //     url: `/products/${id}`,
    //     method: 'PATCH',
    //     body,
    //   }),
    // })
    createProduct: build.mutation<TProduct, TProduct>({
      query: (payload) => ({
        url: '/products',
        body: payload,
        method: 'POST',
      }),
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
  useCreateProductMutation,
  // useUpdateViewsMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = extendedApi;
