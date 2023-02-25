import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from 'shared';
import style from './MainLayout.module.scss';

export const MainLayout = () => (
  <div className={style.wrapper}>
    <Header />
    <div className={style.container}><Outlet /></div>
    <Footer />
  </div>
  );
