import { paths } from 'app/Routes/configRoutes';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'shared/lib/hooks';
import { cookies } from 'shared/lib/hooks/useAuth';
import { BookIcon, ExitIcon } from 'shared/ui/icons';
import style from './Sidebar.module.scss';

export const Sidebar = () => {
  const [avataName, setAvatarName] = useState('');
  const [userName, setUserName] = useLocalStorage('userName');
  const navigate = useNavigate();

  const exitHandler = async () => {
    await setUserName('');
    cookies.remove('token');
    toast.success('Выход выполнен успешно!');
    navigate(paths.MAIN);
  };

  useEffect(() => {
    if (userName !== '') {
      const [name, surname] = userName.split(' ');
      setAvatarName(`${name[0]}${surname[0]}`);
    }
  }, [userName]);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.avatar}>{avataName}</div>
        <div>
          <div className={style.name}>{userName}</div>
          <div className={style.title}>Личный кабинет</div>
        </div>
      </div>
      <NavLink to={paths.USER} className={style.element_active}>
        <span className={style.icon}><BookIcon /></span>
        <span>Объявления</span>
      </NavLink>
      <button className={style.element} type="button" onClick={exitHandler}>
        <span className={style.icon}><ExitIcon /></span>
        <span>Выход</span>
      </button>
    </div>
  );
};
