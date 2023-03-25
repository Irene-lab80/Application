import React from 'react';
import { Card } from 'shared';
import { Spin } from 'antd';
import { useGetProductsQuery } from 'store/query/Posts';
import style from './Feed.module.scss';

export const Feed = () => {
  const { data, isLoading, isError } = useGetProductsQuery(1);
// const [updateViews, { error, isSuccess }] = useUpdateViewsMutation();
  return (
    <div className={style.feedwrapper}>
      {/* <nav className={style.scrollingWrapper}>
          <Buttons
            setItem={setItem}
            menuItems={menuItems}
          />
        </nav> */}
      {isLoading && <Spin />}
      {isError && <div>Error</div>}
      { data && data.response.map((el: any) => (
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
          onClick={() => {
            console.log('update views');
          }}
        />
        ))}
    </div>
);
};
