import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollDirection, Logo, Button, useAuth, Search, SearchIcon } from 'shared';
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

  const searchHandler = () => {
    // dispatch(SetSearchTermAction(searchTerm));
    navigate('/search');
    hideSearch();
  };

  return (
    <header className={`${scrollDirection === 'down' ? style.wrapper_hide : style.wrapper_show}`}>
      <nav className={style.container}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.search_wrapper}>
          <div className={style.search_desktop}>
            <Search onSearch={() => searchHandler} enterButton="Искать" prefix={<SearchIcon />} />
          </div>
          <div className={style.searchMobileIcon}>
            <SearchButton
              showSearch={showSearch}
              hideSearch={hideSearch}
              isOpen={searchOpen}
            />
            {searchOpen &&
            <Search onSearch={() => searchHandler} className={style.searchMobile} />}
          </div>
        </div>
        <div className={style.button}>
          <Button type="colored">Подать объявление</Button>
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
