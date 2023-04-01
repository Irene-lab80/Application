import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollDirection, Logo, Button, useAuth, Search, SearchIcon } from 'shared';
import { paths } from 'app/Routes/configRoutes';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setSearch } from 'store/slice/filtersSlice/slice';
import { MobileMenu } from '../MobileMenu';
import style from './Header.module.scss';
import { BurgerButton } from '../BurgerButton';
import { SearchButton } from '../SearchButton';
import DropDownProfileBtn from '../../DropDownProfileBtn/Index';
import { ProfileButton } from '../../ProfileButton';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();
  const scrollDirection = useScrollDirection();
  const isAuth = useAuth();
  const dispatch = useDispatch();

  const hideMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const showSearch = () => {
    setSearchOpen(true);
    hideMenu();
  };

  const hideSearch = () => {
    setSearchOpen(false);
  };

  const showMenu = () => {
    hideSearch();
    setMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const searchHandler = (value: string) => {
    dispatch(setSearch(value));
    navigate(paths.SEARCH);
    hideSearch();
  };

  const onPostNewAd = () => {
    if (isAuth) {
      navigate(paths.PRODUCT_CREATE);
    } else {
      navigate(paths.AUTH);
      toast('Для того чтобы подать заявление нужно авторизоваться!');
    }
  };

  return (
    <header className={`${scrollDirection === 'down' ? style.wrapper_hide : style.wrapper_show}`}>
      <nav className={style.container}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.search_wrapper}>
          <div className={style.search_desktop}>
            <Search onSearch={searchHandler} enterButton="Искать" prefix={<SearchIcon />} />
          </div>
          <div className={style.searchMobileIcon}>
            <SearchButton
              showSearch={showSearch}
              hideSearch={hideSearch}
              isOpen={searchOpen}
            />
            {searchOpen &&
            <Search onSearch={searchHandler} className={style.searchMobile} />}
          </div>
        </div>
        <div className={style.button}>
          <Button type="colored" onClick={onPostNewAd}>Подать объявление</Button>
        </div>
        <div className={style.burger_wrapper}>
          {!isAuth ?
            <ProfileButton />
          :
            <DropDownProfileBtn />}

          <div className={style.burger_menu}>
            <BurgerButton isOpen={menuOpen} showMenu={showMenu} hideMenu={hideMenu} />
            {menuOpen && <MobileMenu />}
          </div>
        </div>
      </nav>
    </header>
  );
};
