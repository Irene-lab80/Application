/* eslint-disable jsx-a11y/control-has-associated-label */
import { Pagination } from 'antd';
import React from 'react';
import { Button, AddIcon, Search, FilterIcon, SearchIcon, ThreeDotsIcon } from 'shared';
import { useGetProductsQuery } from 'store/query/Posts';
import style from './UserPage.module.scss';

export const UserPage = () => {
  const onAddHandler = () => {
    console.log('add new');
  };

  const onSearch = (value: string) => console.log(value);

  const { data: products } = useGetProductsQuery();
  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.top}>
          <div>
            <h3>Объявления</h3>
            <div>{`Всего: ${products ? products?.length : '..'}`}</div>
          </div>
          <Button onClick={onAddHandler}>
            Добавить
            <AddIcon />
          </Button>
        </div>
        <div className={style.bottom}>
          <Search type="light" placeholder="Найти объявление" onSearch={onSearch} enterButton={<SearchIcon />} className={style.search} />
          <Button type="light">
            Фильтровать
            <FilterIcon />
          </Button>
          <Pagination simple defaultCurrent={2} total={50} />
        </div>
        <div className={style.cards}>
          <div className={style.header}>
            <div>Название</div>
            <div>Категория</div>
            <div>Дата публикации</div>
            <div>Публикация</div>
          </div>
          {products && products.map((product) => (
            <div className={style.card}>
              <div className={style.card_title}>{product.title}</div>
              <div>{product.tag}</div>
              <div>{new Date(product.date).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              <div>{product.publish ? 'да' : 'нет'}</div>
              <button className={style.menu_button} type="button"><ThreeDotsIcon /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
