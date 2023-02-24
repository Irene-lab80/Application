import React from 'react';
import { Routes } from 'react-router-dom';

import { configRoutes } from '.';
import { getRoutes } from './createRoutes';

export const AppRoutes = () => <Routes>{configRoutes.map((el) => getRoutes(el))}</Routes>;
