/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { Pagination, Spin } from 'antd';
import { paths } from 'app/Routes/configRoutes';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TProduct, useGetProductsQuery } from 'store/query/Posts';
import { getFilters, resetFilters } from 'store/slice/filtersSlice';
import { setPage } from 'store/slice/filtersSlice/slice';
import style from './SearchResults.module.scss';

export const SearchResults = () => {
  const [totalItems, setTotalItems] = useState(0);

  const filters = useSelector(getFilters);

  const { data: products, isLoading, isError } = useGetProductsQuery(filters);

  const dispatch = useDispatch();

  const onPageChange = (page: number) => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    if (isError) {
      toast.error('Произошла ошибка!');
    }
  }, []);

  useEffect(() => () => {
    dispatch(resetFilters());
  }, []);

  useEffect(() => {
    if (products) {
      setTotalItems(products.totalCount);
    }
  }, [products]);

  return (
    <div className={style.wrapper}>
      <div className={style.heading}>{`Найдено: ${products ? products.totalCount : '...'}`}</div>
      {isLoading && <Spin />}
      {products && products.response.map((el: TProduct) => (
        <Link to={`/${paths.PRODUCT}/${el.id}`} className={style.card}>
          <div className={style.title}>{el.title}</div>
          <div className={style.description}>{el.description}</div>
          <div className={style.date}>{new Date(el.date).toLocaleString('ru-Ru', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </Link>
      ))}
      <Pagination
        className={style.pagination}
        pageSize={12}
        onChange={onPageChange}
        total={totalItems}
        current={filters._page}
        hideOnSinglePage
      />
    </div>
  );
};
