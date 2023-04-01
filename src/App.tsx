import React from 'react';
import './shared/styles/index.scss';
import ErrorBoundary from 'app/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './app/Routes';
import 'react-toastify/dist/ReactToastify.css';

// const params: Param[] = [
//   {
//     id: 1,
//     name: 'Назначение',
//     type: 'string',
//   },
//   {
//     id: 2,
//     name: 'Длина',
//     type: 'string',
//   },
// ];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
};

export const App = () => (
  <div>
    <ToastContainer />
    <ErrorBoundary>
      <AppRoutes />
      {/* <ModelEditor model={model} params={params} /> */}
    </ErrorBoundary>
  </div>
);
