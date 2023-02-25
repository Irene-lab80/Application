import React, { useEffect, useState } from 'react';
import { LogInIcon, LanguageIcon, SignUpIcon } from 'shared';
import style from './Header.module.scss';

export const Header = () => {
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return (() => {
       window.removeEventListener('scroll', handleScroll);
    });
});

  return (
    <header className={visible ? style.wrapper_visible : style.wrapper_hidden}>
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
