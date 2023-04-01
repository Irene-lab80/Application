/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Button, Card, RefreshIcon } from 'shared';
import { Spin } from 'antd';
import { useGetProductsQuery } from 'store/query/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { getFilters } from 'store/slice/filtersSlice/selectors';
import { optionsTags } from 'shared/utils';
import { resetFilters, setLimit, setPublish, setTags, setUserId } from 'store/slice/filtersSlice/slice';
import style from './Feed.module.scss';

export const Feed = () => {
  const [isButtonActive, setIsButtonActive] = useState<boolean | string>(false);
  const filters = useSelector(getFilters);
  const dispatch = useDispatch();

  const { data: products, isLoading, isFetching, isError } = useGetProductsQuery(filters);

  const onClick = (e: SyntheticEvent) => {
    setIsButtonActive(e.currentTarget.id);
    if (e.currentTarget.id === 'all') {
      dispatch(setTags([]));
    } else {
      dispatch(setTags([e.currentTarget.id]));
    }
  };

  const onLoadMore = () => {
    dispatch(setLimit(filters._limit + 3));
  };

  const renderButtons = () => {
    const buttons = optionsTags.map((tag) => (
      <Button
        key={tag}
        id={tag}
        type={isButtonActive === tag ? 'inverted' : 'text'}
        form="round"
        onClick={onClick}
      >
        {tag}
      </Button>
      ));
      return buttons;
  };

  useEffect(() => {
    dispatch(setPublish([1]));
    return () => {
      dispatch(resetFilters());
    };
}, []);

  return (
    <div className={style.wrapper}>
      <div className={style.nav}>
        <Button
          form="round"
          onClick={onClick}
          id="all"
        >
          Вся доска
        </Button>
        {renderButtons()}
      </div>
      <div className={style.feedwrapper}>
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
      {products && products?.totalCount === 0 && 'Ничего не найдено!'}
      {isLoading && <Spin />}
      {isFetching && <Spin />}
      {isError && <div>Произошла ошибка!</div>}
      {products && products?.totalCount >= 12 &&
      <Button type="inverted" className={style.button_loadmore} onClick={onLoadMore}>
        Загрузить еще
        <RefreshIcon />
      </Button>}
    </div>
  );
};
