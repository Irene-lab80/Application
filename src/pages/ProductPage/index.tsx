import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShowTelButton, ViewsNumber } from 'shared';
import { useGetOneProductQuery, useUpdateViewsMutation } from 'store/query/Posts';
// import moment from 'moment';
// import ProductSlider from '../../common/ProductSlider';
import style from './ProductPage.module.scss';
// import ViewsNumber from '../../common/ViewsNumber';
// import ShowTelButton from '../../common/ShowTelButton';
// import ProductMap from '../../common/ProductMap';
// import CardsSmall from '../../common/CardsSmall';
// import 'moment/locale/ru'; // without this line it didn't work
// import GoBackBtn from '../../common/GoBackBtn';

// moment.locale('ru');

type ProductPagePropsType = {
  // productInfo: {
  //   id: number | undefined;
  //   tag: string | undefined;
  //   title: string | undefined;
  //   description: string | undefined;
  //   price: number | undefined;
  //   date: string | undefined;
  //   views: number | undefined;
  //   src: string | undefined;
  //   tel: string | undefined;
  //   location: string | undefined;
  //   coordinates: number[] | undefined
  // } | undefined;
}
// so that YMaps won't crash on undefined

export const ProductPage = () => {
  // const defaultCoordinates = [56.30, 43.98]; // without it YMaps crahes all page
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetOneProductQuery({ id });
  const [updateViews, data] = useUpdateViewsMutation();

  useEffect(() => {
    if (product && id) {
      updateViews({ id, payload: product.views + 1 });
    }
  }, []);

  useEffect(() => {
   console.log(data);
  }, [data.isLoading]);
  return (
    <div className="page-wrapper">
      {isLoading && <Spin />}
      {isError && 'Error'}
      {
      product
      &&
      <div className={style.wrapper}>
        <div className={style.arrowBtn}>
          {/* <GoBackBtn> </GoBackBtn> */}
        </div>

        <div className={style.header}>
          <div className={style.left}>
            <div className={style.date}>{new Date(product?.date).toLocaleString()}</div>
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
            <div className={style.slider}>
              {/* <ProductSlider src={productInfo?.src} /> */}
            </div>
            <div className={style.info}>
              <div className={style.infoTitle}>Описание:</div>
              <p className={style.description}>{product?.description}</p>
              <div className={style.infoTitle}>Местоположение:</div>
              <span className={style.location}>{product?.location}</span>
            </div>
            {/* <div className={style.map}>
             <ProductMap coordinates={[
              productInfo?.coordinates,
            ] && [defaultCoordinates]}
             />
           </div> */}
          </div>

          <aside className={style.aside}>
            <div className={style.more}>Смотрите также:</div>
            <div className={style.smallCards}>
              {/* <CardsSmall bigTag={productInfo?.tag} id={productInfo?.id} /> */}
            </div>
          </aside>
        </main>
      </div>
     }
    </div>
  );
};
