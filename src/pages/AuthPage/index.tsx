import React from 'react';
import { FormAuth, FormHeader } from 'shared';
import style from './AuthPage.module.scss';

export const AuthPage = () => (
  <div className={style.wrapper}>
    <FormHeader>
      <FormAuth />
    </FormHeader>
  </div>
);
