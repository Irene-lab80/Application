import React from 'react';
import { FormHeader, FormReg } from 'shared';
import style from './RegistrationPage.module.scss';

export const RegistrationPage = () => (
  <div className={style.wrapper}>
    <FormHeader>
      <FormReg />
    </FormHeader>
  </div>
);
