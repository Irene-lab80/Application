import React, { useState } from 'react';
import { Button } from '../Button';
import style from './ShowTelButton.module.scss';

type TProps = {
  children: string;
}

export const ShowTelButton = ({ children } : TProps) => {
  const [numberVisible, setNumberVisible] = useState(false);
  const onCLickHandler = () => {
    setNumberVisible(!numberVisible);
  };

  return (
    <>
      <div className={style.wrapper}>
        <Button onClick={onCLickHandler} type="default">
          <span>{numberVisible ? 'Скрыть номер' : 'Показать номер'}</span>
        </Button>
      </div>
      <a href={children} className={numberVisible ? style.tel_visible : style.tel_hidden}>
        {children}
      </a>
    </>
  );
};
