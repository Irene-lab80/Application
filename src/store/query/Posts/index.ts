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
    getProducts: build.query<TProduct[], void>({
      query: () => ({
        url: '/products',
      }),
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
    // updateViews: build.mutation<any, any>({
    //   query: (id: any, body: any) => ({
    //     url: `/products/${id}`,
    //     method: 'PATCH',
    //     body,
    //   }),
    // })
    createProduct: build.mutation<TProduct, {id: number, views: number}>({
      query: (args) => {
        const { id, views } = args;
        console.log('args:', args);
        return {
        url: `/products/${id}`,
        method: 'PATCH',
        body: views,
        // params: {  },
      };
},
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOneProductQuery,
  useCreateProductMutation,
  // useUpdateViewsMutation,
} = extendedApi;
