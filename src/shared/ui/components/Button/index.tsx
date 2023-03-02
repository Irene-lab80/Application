import React from 'react';
import { Button as ButtonAntd, ButtonProps as AntButtonProps } from 'antd';
import { buttonSize, buttonType } from './constants';

type AntButtonPropsOmit = Omit<AntButtonProps, 'size' | 'type'>;

type TProps = AntButtonPropsOmit & {
  children: string | React.ReactNode;
  size?: 'large' | 'medium' | 'small';
  type?: 'default' | 'arrow' | 'colored';
  onClick?: () => void;
}

export const Button = ({ children, size = 'medium', type = 'default', onClick }: TProps) => (
  <ButtonAntd className={`${buttonSize[size]} ${buttonType[type]}`} onClick={onClick}>{children}</ButtonAntd>
);
