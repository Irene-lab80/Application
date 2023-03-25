import React from 'react';
import { Button as ButtonAntd, ButtonProps as AntButtonProps } from 'antd';
import { buttonType } from './constants';

type AntButtonPropsOmit = Omit<AntButtonProps, | 'type'>;

type TProps = AntButtonPropsOmit & {
  children: string | React.ReactNode;
  type?: 'default' | 'arrow' | 'colored' | 'light';
  onClick?: () => void;
  htmlType?: string;
}

export const Button = ({ children, type = 'default', onClick, htmlType = 'button', ...rest }: TProps) => (
  <ButtonAntd htmlType={htmlType} className={`${buttonType[type]}`} onClick={onClick} {...rest}>{children}</ButtonAntd>
);
