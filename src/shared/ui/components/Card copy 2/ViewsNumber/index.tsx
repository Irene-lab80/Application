import React from 'react';
import { EyeIcon } from 'shared/ui/icons';
import style from './ViewsNumber.module.scss';

type TProps = {
  views: number;
}

export const ViewsNumber = ({ views }: TProps) => (
  <div className={style.views}>
    <EyeIcon />
    <span>{views}</span>
  </div>
);
