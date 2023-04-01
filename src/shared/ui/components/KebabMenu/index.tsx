import { paths } from 'app/Routes/configRoutes';
import React from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, PensilIcon, TrashBinIcon } from 'shared/ui/icons';
import style from './KebabMenu.module.scss';

type TProps = {
  isOpen: boolean;
  id?: string;
  onDelete?: () => void;
}

export const KebabMenu = ({ isOpen, id, onDelete }: TProps) => (
  <div className={isOpen ? style.menu_open : style.menu}>
    <Link to={`/${paths.PRODUCT}/${id}`} className={style.navItem}>
      <EyeIcon />
      <span className={style.navItemText}>Просмотр</span>
    </Link>
    <Link to={`/${paths.PRODUCT_EDIT}/${id}`} className={style.navItem}>
      <PensilIcon />
      <span className={style.navItemText}>Редактировать</span>
    </Link>
    <button className={style.navItem} type="button" onClick={onDelete}>
      <TrashBinIcon />
      <span className={style.navItemText}>Удалить</span>
    </button>
  </div>
);
