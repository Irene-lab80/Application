import React, { SyntheticEvent } from 'react';
import { Button as ButtonAntd, ButtonProps as AntButtonProps } from 'antd';
import { buttonForm, buttonType } from './constants';

type AntButtonPropsOmit = Omit<AntButtonProps, | 'type'>;

type TProps = AntButtonPropsOmit & {
  children: string | React.ReactNode;
  type?: 'default' | 'arrow' | 'colored' | 'light' | 'inverted' | 'text';
  form?: 'round' | 'normal';
  onClick?: (e: SyntheticEvent) => void;
  htmlType?: string;
  className?: string;
}

export const Button = ({ children, type = 'default', form = 'normal', onClick, htmlType = 'button', className, ...rest }: TProps) => (
  <ButtonAntd htmlType={htmlType} className={`${buttonType[type]} ${buttonForm[form]} ${className}`} onClick={onClick} {...rest}>{children}</ButtonAntd>
);
