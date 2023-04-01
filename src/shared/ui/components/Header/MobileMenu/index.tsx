import { paths } from 'app/Routes/configRoutes';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BookIcon, Button, ExitIcon, Search, useAuth } from 'shared';
import { useLocalStorage } from 'shared/lib/hooks';
import { cookies } from 'shared/lib/hooks/useAuth';
import { setSearch } from 'store/slice/filtersSlice/slice';
import style from './MobileMenu.module.scss';

type TProps = {
  setMenuOpen: (arg: boolean) => void;
}

export const MobileMenu = ({ setMenuOpen }: TProps) => {
  const [avatarName, setAvatarName] = useState('');

  const [userName, setUserName] = useLocalStorage('userName', '');
  const [, setUserId] = useLocalStorage('userId');

  const isAuth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const exitHandler = async () => {
    setMenuOpen(false);
    if (isAuth) {
      await setUserName('');
      await setUserId('');
      cookies.remove('token');
      toast.success('Выход выполнен успешно!');
      navigate(paths.MAIN);
    } else {
      navigate(paths.AUTH);
    }
  };

  const searchHandler = (value: string) => {
    dispatch(setSearch(value));
    navigate(paths.SEARCH);
    setMenuOpen(false);
  };

  const onClick = () => {
    setMenuOpen(false);
    if (isAuth) {
      navigate(paths.PRODUCT_CREATE);
    } else {
      navigate(paths.AUTH);
    }
  };

  useEffect(() => {
    if (userName !== '') {
      const [name, surname] = userName.split(' ');
      setAvatarName(`${name[0]}${surname[0]}`);
    }
  }, [userName]);

  return (
    <div className={style.mobileMenu}>
      <div className={style.mobileButton}>
        <Search onSearch={searchHandler} className={style.searchMobile} enterButton="Искать" />
        <Link to="edit-ad">
          <Button onClick={onClick} type="colored">
            Подать объявление
          </Button>
        </Link>
        <div>
          <Link to={paths.USER} className={style.menu_item}>
            <span className={style.avatar}>{isAuth ? avatarName : 'Г'}</span>
            <span>{isAuth ? userName : 'Гость'}</span>
          </Link>
          {isAuth &&
          <Link to={paths.USER} className={style.menu_item}>
            <BookIcon />
            Мои объявления
          </Link>}
          <button type="button" className={style.menu_item} onClick={exitHandler}>
            <ExitIcon />
            {isAuth ? 'Выйти' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};
