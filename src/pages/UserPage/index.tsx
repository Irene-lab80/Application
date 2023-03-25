/* eslint-disable jsx-a11y/control-has-associated-label */
import { Pagination } from 'antd';
import { paths } from 'app/Routes/configRoutes';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, AddIcon, Search, FilterIcon, SearchIcon, ThreeDotsIcon } from 'shared';
import { KebabMenu } from 'shared/ui/components/KebabMenu';
import { useDeleteProductMutation, useGetProductsQuery } from 'store/query/Posts';
import { toast } from 'react-toastify';
import style from './UserPage.module.scss';

export const UserPage = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [openCard, setOpenCard] = useState<string | boolean>(false);
  const [requestID, setRequestID] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const onAddHandler = () => {
    navigate(`/${paths.PRODUCT_CREATE}`);
  };

  const onSearch = (value: string) => console.log(value);

  const { data } = useGetProductsQuery(page);
  const [deleteProduct, { isSuccess: dSuccess, isError: dError }] = useDeleteProductMutation();

  const onPageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    if (data) {
      setTotalItems(data.totalCount);
    }
  }, [data]);

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
          {data && data.response.map((product: any) => (
            <div className={style.card}>
              <div className={style.card_title}>{product.title}</div>
              <div>{product.tag}</div>
              <div>{new Date(product.date).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              <div>{product.publish ? 'да' : 'нет'}</div>
              <button
                onClick={openCard ? () => setOpenCard(false) : () => setOpenCard(product.id)}
                className={style.menu_button}
                type="button"
              >
                <ThreeDotsIcon />
              </button>
              <KebabMenu
                isOpen={openCard === product.id}
                id={product.id}
                onDelete={() => deleteProduct(product.id)}
              />
            </div>
          ))}
        </div>
      </div>
      {dSuccess && <div className="success">Успешно удалено!</div>}
      {dError && <div className="error">При удалении произошла ошибка!</div>}
    </div>
  );
};
