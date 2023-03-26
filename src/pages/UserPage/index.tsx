/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Pagination, Spin } from 'antd';
import { paths } from 'app/Routes/configRoutes';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, AddIcon, Search, FilterIcon, SearchIcon } from 'shared';
import { useDeleteProductMutation, useGetProductsQuery, useLazySearchProductQuery } from 'store/query/Posts';
import { toast } from 'react-toastify';
import style from './UserPage.module.scss';
import { Content } from './Content';

export const UserPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [openCard, setOpenCard] = useState<string | boolean>(false);
  const [requestID, setRequestID] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const { data: products, isLoading, error } = useGetProductsQuery(page);
  const [deleteProduct, { isLoading: dLoading, error: dError, isSuccess: dSuccess }] = useDeleteProductMutation();
  const [trigger, data] = useLazySearchProductQuery();

  const onAddHandler = () => {
    navigate(`/${paths.PRODUCT_CREATE}`);
  };

  const onSearch = async (value: string) => {
    setSearch(value);
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    if (products) {
      setTotalItems(products.totalCount);
    }
  }, [products]);

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
    if (dError) {
      // @ts-ignore
      toast.error(dError?.data);
    }
    if (dSuccess) {
      toast.success('Успешно удалено!');
    }
  }, [dLoading]);

  useEffect(() => {
    if (search !== '') {
      trigger(search);
    }
  }, [search]);

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
          <Button type="light">
            Фильтровать
            <FilterIcon />
          </Button>
          <Pagination
            simple
            defaultCurrent={2}
            defaultPageSize={itemsPerPage}
            onChange={onPageChange}
            total={totalItems}
            current={page}
            className={style.pagination}
          />
        </div>
        <div className={style.cards}>
          <div className={style.header}>
            <div>Название</div>
            <div>Категория</div>
            <div>Дата публикации</div>
            <div>Публикация</div>
          </div>
          {isLoading && <Spin />}
          {products?.response &&
          <Content
            deleteProduct={deleteProduct}
            isLoading={data.isLoading}
            openCard={openCard}
            setOpenCard={setOpenCard}
            content={search === '' ? products?.response : data?.data}
          />}
        </div>
      </div>
    </div>
  );
};
