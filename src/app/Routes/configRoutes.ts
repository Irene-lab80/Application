/* eslint-disable no-undef */
import * as Pages from 'pages';
import { MainLayout } from 'shared';

export enum paths {
  MAIN = '/',
  REDIRECT = '/auth',
  AUTH = 'auth',
  INNER = 'inner',
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
        isPrivate: true,
        element: Pages.MainPage,
        index: true,
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
