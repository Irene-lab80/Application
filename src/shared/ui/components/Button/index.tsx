import React from 'react';
import { Button as ButtonAntd, ButtonProps as AntButtonProps } from 'antd';
import { buttonSize, buttonType } from './constants';

type AntButtonPropsOmit = Omit<AntButtonProps, 'size' | 'type'>;

type TProps = AntButtonPropsOmit & {
  children: string | React.ReactNode;
  size?: 'large' | 'medium' | 'small';
  type?: 'default' | 'arrow' | 'colored';
}

export const Button = ({ children, size = 'medium', type = 'default' }: TProps) => (
  <ButtonAntd className={`${buttonSize[size]} ${buttonType[type]}`}>{children}</ButtonAntd>
);
