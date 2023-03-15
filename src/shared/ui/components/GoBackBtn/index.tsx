import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackArrowIcon } from 'shared/ui/icons';
import style from './GoBackBtn.module.scss';

type TProps = {
  children: string;
}

export const GoBackBtn = ({ children }: TProps) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <button className={style.wrapper} type="button" onClick={goBack}>
      <BackArrowIcon />
      <span className={style.title}>{children}</span>
    </button>
  );
};
