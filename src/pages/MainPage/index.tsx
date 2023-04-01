import React from 'react';
import { Banner, Feed } from 'features/ManePageComponents';
import style from './MainPage.module.scss';

export const MainPage = () => (
  <div className={style.wrapper}>
    <Banner />
    <Feed />
  </div>
  );
