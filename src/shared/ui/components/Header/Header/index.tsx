import React from 'react';
import { LogInIcon, LanguageIcon, SignUpIcon, useScrollDirection } from 'shared';
import style from './Header.module.scss';

export const Header = () => {
  const scrollDirection = useScrollDirection();

  return (
    <header className={`${scrollDirection === 'down' ? style.wrapper_hide : style.wrapper_show}`}>
      <nav className={style.container}>
        <div>Home</div>
        <ul className={style.navigation}>
          <li className={style.nav_item}>
            <LanguageIcon />
            En
          </li>
          <li className={style.nav_item}>
            <LogInIcon />
            Log In
          </li>
          <li className={style.nav_item}>
            <SignUpIcon />
            Sign Up
          </li>
        </ul>
      </nav>
    </header>
  );
};
