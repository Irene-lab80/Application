import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'shared/lib';
import { paths } from './configRoutes';

type TProps={
  children: React.ReactElement;
}

export const PrivateRoute = ({ children }:TProps) => {
  const isAuth = useAuth();

  if (!isAuth) {
    return <Navigate to={paths.REDIRECT} />;
  }

  return children;
};
