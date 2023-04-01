import React from 'react';
import style from './Banner.module.scss';
import bannerPicture from '../../../shared/assets/images/banner.png';

export const Banner = () => (
  <div className={style.wrapper}>
    <div className={style.info}>
      <h2 className={style.title}>Доска объявлений</h2>
      <p className={style.text}>
        Находи тысячи разнообразных товаров и услуг от продавцов со всей страны.
        Безопасные расчеты.
        Удобный сервис доставки
      </p>
    </div>
    <img className={style.img} src={bannerPicture} alt="Cart" />
  </div>
);
