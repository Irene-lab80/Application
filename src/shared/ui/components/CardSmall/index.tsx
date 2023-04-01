import React from 'react';
import { Link } from 'react-router-dom';
import style from './CardSmall.module.scss';

type TProps = {
  id: number | string;
  title: string;
  src: string;
};

export const CardSmall = ({ id, title, src }: TProps) => (
  <Link to={`/product/${id}`}>
    <div className={style.wrapper}>
      <img className={style.img} src={src} alt="product" />
      <div className={style.title}>{title}</div>
    </div>
  </Link>
  );
