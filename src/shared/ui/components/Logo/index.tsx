import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from 'shared/ui/icons';
import style from './Logo.module.scss';

export const Logo = () => (
  <Link to="/" className={style.wrapper}>
    <LogoIcon />
    <h1 className={style.title}>СТИКЕР</h1>
  </Link>
);
