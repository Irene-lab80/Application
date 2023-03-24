import React from 'react';
import { Button as ButtonAntd, ButtonProps as AntButtonProps } from 'antd';
import { buttonSize, buttonType } from './constants';

type AntButtonPropsOmit = Omit<AntButtonProps, 'size' | 'type'>;

type TProps = AntButtonPropsOmit & {
  children: string | React.ReactNode;
  size?: 'large' | 'medium' | 'small';
  type?: 'default' | 'arrow' | 'colored' | 'light';
  onClick?: () => void;
  htmlType?: string;
}

export const Button = ({ children, size = 'medium', type = 'default', onClick, htmlType = 'button' }: TProps) => (
  <ButtonAntd htmlType={htmlType} className={`${buttonSize[size]} ${buttonType[type]}`} onClick={onClick}>{children}</ButtonAntd>
);
