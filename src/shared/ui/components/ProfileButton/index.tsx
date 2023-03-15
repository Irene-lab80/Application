import { paths } from 'app/Routes/configRoutes';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'shared/lib';
import { UserIcon } from 'shared/ui/icons';
import style from './ProfileButton.module.scss';

export const ProfileButton = () => {
  const isAuth = useAuth();
  return (
    <Link to={paths.AUTH} className={style.auth_button}>
      <UserIcon />
      <span className={style.auth_text}>{isAuth ? 'Профиль' : 'Войти'}</span>
    </Link>
  );
};
