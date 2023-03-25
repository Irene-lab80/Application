import React from 'react';
import './shared/styles/index.scss';
import ErrorBoundary from 'app/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './app/Routes';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => (
  <div>
    <ToastContainer />
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  </div>
);
