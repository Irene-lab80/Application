/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { Pagination, Spin } from 'antd';
import { paths } from 'app/Routes/configRoutes';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, AddIcon, Search, FilterIcon, SearchIcon, SortIcon, FilterMenu } from 'shared';
import { useDeleteProductMutation, useGetProductsQuery } from 'store/query/Posts';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getFilters } from 'store/slice/filtersSlice';
import { resetFilters, setOrder, setPage, setSearch, setSort, setUserId } from 'store/slice/filtersSlice/slice';
import { useLocalStorage } from 'shared/lib/hooks';
import style from './UserPage.module.scss';
import { Content } from './Content';

export const UserPage = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [openCard, setOpenCard] = useState<string | boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [ascending, setAscending] = useState(true);

  const [userId] = useLocalStorage('userId', '');

  const filters = useSelector(getFilters);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: products, isLoading, isFetching } = useGetProductsQuery(filters);
  const [deleteProduct, { isLoading: dLoading, error: dError, isSuccess: dSuccess }] = useDeleteProductMutation();

  const onAddHandler = () => {
    navigate(`/${paths.PRODUCT_CREATE}`);
  };

  const onSearch = async (value: string) => {
    dispatch(setSearch(value));
  };

  const onPageChange = (page: number) => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    if (products) {
      setTotalItems(products.totalCount);
    }
  }, [products]);

  const onOrderTitle = () => {
    setAscending((prev) => !prev);
    dispatch(setSort('title'));
  };

  const onOrderDate = () => {
    setAscending((prev) => !prev);
    dispatch(setSort('date'));
  };

  const onOrderTag = () => {
    setAscending((prev) => !prev);
    dispatch(setSort('tag'));
  };

  const onOrderPublish = () => {
    setAscending((prev) => !prev);
    dispatch(setSort('publish'));
  };

  const onFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    if (ascending === true) {
      dispatch(dispatch(setOrder('asc')));
    } else {
      dispatch(dispatch(setOrder('desc')));
    }
  }, [ascending]);

  useEffect(() => {
    if (dError) {
      // @ts-ignore
      toast.error(dError?.data);
    }
    if (dSuccess) {
      toast.success('Успешно удалено!');
    }
  }, [dLoading]);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.nodeName !== 'svg' && target.nodeName !== 'path') {
        setOpenCard(false);
      }
    };

    document.body.addEventListener('click', closeDropdown);

    return () => document.body.removeEventListener('click', closeDropdown);
  }, []);

  useEffect(() => {
    if (userId && userId !== '') {
      dispatch(setUserId(userId));
    console.log('set user');
    }
    return () => {
    dispatch(resetFilters());
  };
}, []);

  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.top}>
          <div>
            <h3>Объявления</h3>
            <div>{`Всего: ${totalItems}`}</div>
          </div>
          <Button onClick={onAddHandler}>
            Добавить
            <AddIcon />
          </Button>
        </div>
        <div className={style.bottom}>
          <Search type="light" placeholder="Найти объявление" onSearch={onSearch} enterButton={<SearchIcon />} className={style.search} />
          <div className={style.filter_wrapper}>
            <Button type="light" onClick={onFilter} className={isButtonActive ? style.button_active : ''}>
              Фильтровать
              <FilterIcon className="icon" />
            </Button>
            <FilterMenu
              isOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              setIsButtonActive={setIsButtonActive}
            />
          </div>
          <Pagination
            className={style.pagination}
            pageSize={12}
            simple
            onChange={onPageChange}
            total={totalItems}
            current={filters._page}
            hideOnSinglePage
          />
        </div>
        <div className={style.cards}>
          <div className={style.header}>
            <button
              className={style.button_sort}
              type="button"
              onClick={onOrderTitle}
            >
              Название
              <SortIcon />
            </button>
            <button
              className={style.button_sort}
              type="button"
              onClick={onOrderTag}
            >
              Категория
              <SortIcon />
            </button>
            <button
              className={style.button_sort}
              type="button"
              onClick={onOrderDate}
            >
              Дата публикации
              <SortIcon />
            </button>
            <button
              className={style.button_sort}
              type="button"
              onClick={onOrderPublish}
            >
              Публикация
              <SortIcon />
            </button>
          </div>
          {isLoading && <Spin />}
          {isFetching && <Spin />}
          {products?.response &&
          <Content
            deleteProduct={deleteProduct}
            isLoading={isLoading}
            openCard={openCard}
            setOpenCard={setOpenCard}
            content={products?.response}
          />}
        </div>
      </div>
    </div>
  );
};
