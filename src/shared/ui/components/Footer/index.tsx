import React from 'react';
import { Logo } from '../Logo';
import style from './Footer.module.scss';

export const Footer = () => (
  <footer className={style.wrapper}>
    <div className={style.container}>
      <div className={style.left}>
        <Logo />
        <span className={style.left_text}>Доска объявлений </span>
      </div>
      <div>© ООО «Доска диджитал», 2022</div>
    </div>
  </footer>
);
