import React, { useState, useEffect } from 'react';
import { Card } from 'shared';
import { Spin } from 'antd';
import { useGetOneProductQuery, useGetProductsQuery, useLazyGetOneProductQuery, useUpdateViewsMutation } from 'store/query/Posts';
import { useSelector } from 'react-redux';
import { getFilters } from 'store/slice/filtersSlice';
import style from './Feed.module.scss';

export const Feed = () => {
  const filters = useSelector(getFilters);

  const { data: products, isLoading, isError } = useGetProductsQuery(filters);

  return (
    <div className={style.feedwrapper}>
      {/* <nav className={style.scrollingWrapper}>
          <Buttons
            setItem={setItem}
            menuItems={menuItems}
          />
        </nav> */}
      {isLoading && <Spin />}
      {isError && <div>Произошла ошибка!</div>}
      { products && products.response.map((el: any) => (
        <Card
          id={el.id}
          key={el.id}
          tag={el.tag}
          title={el.title}
          description={el.description}
          price={el.price}
          date={el.date}
          views={el.views}
          src={el.src}
        />
        ))}
    </div>
  );
};
