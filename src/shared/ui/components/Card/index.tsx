import React from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, ViewsNumber } from 'shared';
import style from './Card.module.scss';

type TProps = {
  id: number | string;
  tag: string;
  title: string;
  description: string;
  price: number;
  date: string;
  views: number;
  src: string;
};

export const Card = ({ id, tag, title, description, price, date, views, src }: TProps) => (
  <Link to={`product/${id}`}>
    <div className={style.wrapper}>
      <div className={style.imgWrapper}>
        <img className={style.img} src={src} alt="product" />
        <div className={style.tag}>{tag}</div>
      </div>
      <div className={style.info}>
        <div className={style.top}>
          <div className={style.title}>{title}</div>
          <div className={style.description}>{description}</div>
        </div>
        <div className={style.bottom}>
          <div className={style.price}>
            { `${(price)?.toLocaleString('ru')} Р `}
          </div>
          <div className={style.footer}>
            <div className={style.date}>{new Date(date).toLocaleString('ru-RU')}</div>
            <ViewsNumber views={views} />
          </div>
        </div>
      </div>
    </div>
  </Link>
  );
