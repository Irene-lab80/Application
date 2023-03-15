import React from 'react';
import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BookIcon, ExitIcon } from 'shared/ui/icons';
import { getUser, logout } from 'store/slice/userSlice';
import { cookies } from 'shared/lib/hooks/useAuth';
import { paths } from 'app/Routes/configRoutes';
import style from './DropDownProfileBtn.module.scss';
import { ProfileButton } from '../ProfileButton';

const DropDownProfileBtn = () => {
  const user = useSelector(getUser);
  const { firstName, secondName } = user;
  const AVATAR_NAME = `${firstName?.slice(0, 1)}${secondName?.slice(0, 1)}`;
  const dispatch = useDispatch();
  const exitHandler = () => {
    dispatch(logout);
    cookies.remove('token');
    console.log(user);
  };

  const items = [
    {
      key: '1',
      label: (
        <div className={style.menu_item}>
          <span className={style.avatar}>{firstName ? AVATAR_NAME : 'Г'}</span>
          <span>{firstName || 'Гость'}</span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <Link to={paths.MY_ADS} className={style.menu_item}>
          Мои объявления
        </Link>
      ),
      icon: <BookIcon />,
    },
    {
      key: '3',
      label: (
        <Link to={paths.MAIN} className={style.menu_item} onClick={exitHandler}>
          Выйти
        </Link>
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
