import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from 'shared';
import { Sidebar } from 'shared/ui/components';
import style from './UserLayout.module.scss';

export const UserLayout = () => (
  <div className={style.wrapper}>
    <Header />
    <div className={style.container}>
      <div className={style.grid}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
    <Footer />
  </div>
);
