import { Spin } from 'antd';
import React from 'react';
import { ThreeDotsIcon } from 'shared';
import { KebabMenu } from 'shared/ui/components/KebabMenu';
import style from './UserPage.module.scss';

type TProps = {
  content: any;
  isLoading: any;
  openCard: boolean | string;
  setOpenCard: (arg: boolean) => void;
  deleteProduct: any;
}

export const Content = ({ content, isLoading, openCard, setOpenCard, deleteProduct }: TProps) => (
  <div>
    {isLoading && <Spin />}
    {content && content.length !== 0 ? content.map((product: any) => (
      <div className={style.card} key={product.id}>
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
      )) : 'Ничего не найдено!'}
  </div>
);
