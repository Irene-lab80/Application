import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared';
import style from './MobileMenu.module.scss';

export const MobileMenu = () => (
  <div className={style.mobileMenu}>
    <div className={style.mobileButton}>
      <Link to="edit-ad">
        <Button onClick={() => {}} type="colored">
          Подать объявление
        </Button>
      </Link>
    </div>
    <ul className={style.list}>
      <li className={style.listItem}>Вся лента</li>
      <li className={style.listItem}>Автомобили</li>
      <li className={style.listItem}>Аксессуары</li>
      <li className={style.listItem}>Мебель</li>
      <li className={style.listItem}>Одежда</li>
      <li className={style.listItem}>Спорт</li>
      <li className={style.listItem}>Техника</li>
      <li className={style.listItem}>Товары для дома</li>
    </ul>
  </div>
);
