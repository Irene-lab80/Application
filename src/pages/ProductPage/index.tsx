/* eslint-disable max-len */
import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GoBackBtn, ShowTelButton, ViewsNumber } from 'shared';
import { CardSmall } from 'shared/ui';
import { TProduct, useGetOneProductQuery, useGetProductsQuery, useUpdateViewsMutation } from 'store/query/Posts';
import { getFilters } from 'store/slice/filtersSlice';
import { setTags } from 'store/slice/filtersSlice/slice';
import style from './ProductPage.module.scss';

export const ProductPage = () => {
  const filters = useSelector(getFilters);
  const dispatch = useDispatch();

  const { id } = useParams();

  const { data: product, isLoading, isError } = useGetOneProductQuery({ id });
  const { data: products } = useGetProductsQuery(filters);

  const [updateViews] = useUpdateViewsMutation();

  useEffect(() => {
    if (product?.tag) {
      dispatch(setTags([product.tag]));
    }
  }, []);

  useEffect(() => {
    if (product && id) {
      updateViews({ id, payload: { views: product.views + 1 } });
    }
  }, [product, id]);

  return (
    <div className={style.wrapper}>
      {isLoading && <Spin />}
      {isError && 'Error'}
      {
      product
      &&
      <div className={style.wrapper}>
        <div className={style.arrowBtn}>
          <GoBackBtn>Назад</GoBackBtn>
        </div>
        <div className={style.header}>
          <div className={style.left}>
            <div className={style.date}>{new Date(product?.date).toLocaleString(('ru-RU'), { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            <h2 className={style.title}>{product?.title}</h2>
            <div className={style.number}>WS-25645-253-55</div>
            <ViewsNumber views={product.views} />
          </div>

          <div className={style.headerRight}>
            <div className={style.price}>{`${product?.price?.toLocaleString('ru')} Р`}</div>
            <div className={style.telButton}>
              <ShowTelButton>{product.tel}</ShowTelButton>
            </div>
          </div>
        </div>

        <main className={style.main}>
          <div className={style.left}>
            <div className={style.image}>
              <img src={product.src} alt={product.title} />
            </div>
            <div className={style.info}>
              <div className={style.infoTitle}>Описание:</div>
              <p className={style.description}>{product?.description}</p>
              <div className={style.infoTitle}>Местоположение:</div>
              <span className={style.location}>{product?.location}</span>
            </div>
          </div>

          <aside className={style.aside}>
            <div className={style.more}>Смотрите также:</div>
            <div className={style.smallCards}>
              {products && products.response.filter((el) => Number(el.id) !== Number(id)).slice(0, 2).map((product: TProduct) =>
              (<CardSmall
                key={product.id}
                id={product.id}
                src={product.src}
                title={product.title}
              />))}
            </div>
          </aside>
        </main>
      </div>
     }
    </div>
  );
};
