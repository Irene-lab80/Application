import { paths } from 'app/Routes/configRoutes';
import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './FormHeader.module.scss';

type TProps = {
  children: React.ReactNode;
}

export const FormHeader = ({ children }: TProps) => (
  <div className={style.wrapper}>
    <NavLink
      className={({ isActive }) => (isActive ? style.button_active : style.button)}
      to={paths.AUTH}
    >
      Авторизация
    </NavLink>
    <NavLink
      className={({ isActive }) => (isActive ? style.button_active : style.button)}
      to={paths.REG}
    >
      Регистрация
    </NavLink>
    <div className={style.form}>
      {children}
    </div>
  </div>
);
