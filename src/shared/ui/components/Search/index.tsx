import React, { ReactElement } from 'react';
import { Input, InputProps } from 'antd';
import { SearchIcon } from 'shared/ui/icons';
import { searchType } from './constants';

const AntdSearch = Input.Search;

type TProps = InputProps & {
  onSearch: (value: string) => void;
  className?: string;
  enterButton?: string | ReactElement;
  placeholder?: string;
  type?: 'default' | 'light';
}

export const Search = ({ onSearch, className, enterButton, placeholder, type = 'default' }: TProps) => (
  <div className={className}>
    <AntdSearch
      className={`${searchType[type]}`}
      onSearch={onSearch}
      enterButton={enterButton}
      placeholder={placeholder}
    />
  </div>
);
