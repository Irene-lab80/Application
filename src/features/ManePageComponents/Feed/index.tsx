/* eslint-disable no-underscore-dangle */
import React, { useState, SyntheticEvent } from 'react';
import { Button, Card, RefreshIcon } from 'shared';
import { Spin } from 'antd';
import { useGetProductsQuery } from 'store/query/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { getFiltersMain } from 'store/slice/filtersMainSlice/selectors';
import { optionsTags } from 'shared/utils';
import { setTags, setLimit } from 'store/slice/filtersMainSlice/slice';
import style from './Feed.module.scss';

export const Feed = () => {
  const [isButtonActive, setIsButtonActive] = useState<boolean | string>(false);
  const filters = useSelector(getFiltersMain);
  const dispatch = useDispatch();

  const { data: products, isLoading, isError } = useGetProductsQuery(filters);

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
        {products?.totalCount === 0 && 'Ничего не найдено!'}
      </div>
      {products?.totalCount >= 12 &&
      <Button type="inverted" className={style.button} onClick={onLoadMore}>
        Загрузить еще
        <RefreshIcon />
      </Button>}
    </div>
  );
};
