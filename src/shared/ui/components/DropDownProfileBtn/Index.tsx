import React, { useEffect, useState } from 'react';
import { Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BookIcon, ExitIcon } from 'shared/ui/icons';
import { cookies, useAuth } from 'shared/lib/hooks/useAuth';
import { paths } from 'app/Routes/configRoutes';
import { useLocalStorage } from 'shared/lib/hooks';
import style from './DropDownProfileBtn.module.scss';
import { ProfileButton } from '../ProfileButton';

const DropDownProfileBtn = () => {
  const [avatarName, setAvatarName] = useState('');
  const [userName, setUserName] = useLocalStorage('userName', '');
  const isAuth = useAuth();
  const navigate = useNavigate();

  const exitHandler = async () => {
    await setUserName('');
    cookies.remove('token');
    navigate(paths.MAIN);
  };

  useEffect(() => {
    if (userName !== '') {
      const [name, surname] = userName.split(' ');
      setAvatarName(`${name[0]}${surname[0]}`);
    }
  }, [userName]);

  const items = [
    {
      key: '1',
      label: (
        <div className={style.menu_item}>
          <span className={style.avatar}>{isAuth ? avatarName : 'Г'}</span>
          <span>{isAuth ? userName : 'Гость'}</span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <Link to={paths.USER} className={style.menu_item}>
          Мои объявления
        </Link>
      ),
      icon: <BookIcon />,
    },
    {
      key: '3',
      label: (
        <button type="button" className={style.menu_item} onClick={exitHandler}>
          Выйти
        </button>
      ),
      icon: <ExitIcon />,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <div className={style.wrapper}>
        <ProfileButton />
      </div>
    </Dropdown>
  );
};

export default DropDownProfileBtn;
