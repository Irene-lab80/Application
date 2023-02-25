import React from 'react';
import { useGetPostsQuery } from 'store/query/Posts';
import styles from './MainPage.module.scss';

export const MainPage = () => {
  const { data } = useGetPostsQuery();
  console.log(data);
  return (
    <div className={styles.wrapper}>
      Main Page
    </div>
);
};
