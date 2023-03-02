/* eslint-disable no-undef */
import * as Pages from 'pages';
import { MainLayout } from 'shared';

export enum paths {
  MAIN = '/',
  REDIRECT = '/auth',
  AUTH = 'auth',
  INNER = 'inner',
  PRODUCT_PAGE = 'product/:id',
  NOTFOUND = '*',
}

export type TRoute = {
  id: string;
  isPrivate: boolean;
  element: () => JSX.Element;
  path?: string;
  children?: TRoute[];
  index?:boolean;
};

export const configRoutes: TRoute[] = [
  {
    id: '1',
    isPrivate: true,
    path: paths.MAIN,
    element: MainLayout,
    children: [
      {
        id: '1.1',
        isPrivate: false,
        element: Pages.MainPage,
        index: true,
      },
      {
        id: '1.2',
        isPrivate: false,
        element: Pages.ProductPage,
        path: paths.PRODUCT_PAGE,

      },
      {
        id: '1.3',
        isPrivate: false,
        element: Pages.NotFoundPage,
        path: paths.NOTFOUND,
      },
    ],
  },
];
