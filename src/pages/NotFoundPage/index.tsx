import React from 'react';
import catImage from '../../shared/assets/images/page-not-found.png';
import style from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className="page-wrapper">
    <div className={style.page__wrapper}>
      <div className={style.page__info}>
        <p className={style.page__message_bold}>Упс! Кажется, на эту страницу прилег котик</p>
        <p className={style.page__message_error}>Ошибка 404</p>
        <p className={style.page__message}>
          Мы уже разбираемся, почему так получилось, скоро все починим.
        </p>
      </div>
      <img className={style.page__img} src={catImage} alt="Page not found cat" />
    </div>
  </div>
);
