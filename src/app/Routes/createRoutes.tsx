import React from 'react';
import { Route } from 'react-router-dom';
import { TRoute } from './configRoutes';
import { PrivateRoute } from './PrivateRoute';

export const getRoutes = (el: TRoute) => {
  if (el.children?.length) {
    return (
      <Route key={el.id} path={el.path} element={<el.element />}>
        {el.children.map((child: TRoute) => getRoutes(child))}
      </Route>
    );
  }

  if (el.isPrivate) {
    return (
      <Route
        key={el.id}
        path={el.path}
        index={el.index}
        element={
          <PrivateRoute>
            <el.element />
          </PrivateRoute>
        }
      />
    );
  }

  return <Route index={el.index} key={el.id} path={el.path} element={<el.element />} />;
};
