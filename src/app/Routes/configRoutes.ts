/* eslint-disable no-undef */
import * as Pages from 'pages';
import { MainLayout } from 'shared';
import { UserLayout } from 'shared/ui/Layouts/UserLayout';

export enum paths {
  MAIN = '/',
  REDIRECT = '/auth',
  AUTH = '/auth',
  REG = '/reg',
  INNER = 'inner',
  PRODUCT = 'product',
  PRODUCT_EDIT = 'product-edit',
  PRODUCT_CREATE = 'product-create',
  PRODUCT_EDIT_PAGE = 'product-edit/:id',
  PRODUCT_PAGE = 'product/:id',
  MY_ADS = '/my-ads',
  NOTFOUND = '*',
  USER = '/user',
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
        element: Pages.AuthPage,
        path: paths.AUTH,
      },
      {
        id: '1.4',
        isPrivate: false,
        element: Pages.RegistrationPage,
        path: paths.REG,
      },
      {
        id: '1.5',
        isPrivate: false,
        element: Pages.NotFoundPage,
        path: paths.NOTFOUND,
      },
    ],
  },
  {
    id: '2',
    isPrivate: false,
    element: UserLayout,
    children: [
      {
        id: '2.1',
        isPrivate: true,
        element: Pages.UserPage,
        path: paths.USER,
      },
      {
        id: '2.2',
        isPrivate: false,
        element: Pages.ProductEditPage,
        path: paths.PRODUCT_EDIT_PAGE,
      },
      {
        id: '2.3',
        isPrivate: false,
        element: Pages.ProductCreatePage,
        path: paths.PRODUCT_CREATE,
      },
    ],
  },
];
