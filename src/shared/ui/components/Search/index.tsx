import React from 'react';
import { Input } from 'antd';
import { SearchIcon } from 'shared/ui/icons';
import style from './Search.module.scss';

const AntdSearch = Input.Search;

type TProps = {
  onSearch: () => void;
  className?: string;
}

export const Search = ({ onSearch, className }: TProps) => (
  <div className={className}>
    <AntdSearch className={style.wrapper} onSearch={onSearch} enterButton="Искать" prefix={<SearchIcon />} />
  </div>
);
