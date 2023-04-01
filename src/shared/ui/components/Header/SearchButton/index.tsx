/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { CloseIcon, SearchIcon } from 'shared/ui/icons';
import style from './SearchButton.module.scss';

type TProps = {
  isOpen: boolean;
  showSearch: () => void;
  hideSearch: () => void;
}

export const SearchButton = ({ isOpen, showSearch, hideSearch }: TProps) => (
  <div>
    {
      isOpen
      ?
        <button type="button" onClick={hideSearch} className={style.button}><CloseIcon /></button>
      :
        <button type="button" onClick={showSearch} className={style.button}><SearchIcon /></button>
      }
  </div>
);
