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
    getOneProduct: build.query<TProduct, string>({
      query: (id: string) => ({
        url: `/products/${id}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetOneProductQuery } = extendedApi;
