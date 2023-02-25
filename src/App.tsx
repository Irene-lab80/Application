import React from 'react';
import './shared/styles/index.scss';
import ErrorBoundary from 'app/ErrorBoundary';
import { AppRoutes } from './app/Routes';

export const App = () => (
  <ErrorBoundary>
    <AppRoutes />
  </ErrorBoundary>
);
