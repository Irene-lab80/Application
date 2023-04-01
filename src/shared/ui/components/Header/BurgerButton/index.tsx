/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { BurgerMenuIcon, CloseIcon } from 'shared/ui/icons';
import style from './BurgerButton.module.scss';

type TProps = {
  isOpen: boolean;
  showMenu: () => void;
  hideMenu: () => void;
}

export const BurgerButton = ({ isOpen, showMenu, hideMenu }: TProps) => (
  <div className={style.mobileMenu}>
    {
      isOpen
      ?
        <button type="button" onClick={hideMenu} className={style.button}><CloseIcon /></button>
      :
        <button type="button" onClick={showMenu} className={style.button}><BurgerMenuIcon /></button>
      }
  </div>
);
