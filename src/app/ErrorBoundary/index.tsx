import { paths } from 'app/Routes/configRoutes';
import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

type StateType = {
  hasError: boolean;
};
type PropsType = {
  children: ReactNode;
};

class ErrorBoundary extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: string) {
    return { hasError: true, error };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return !hasError ? (
      children
    ) : (
      <div className={styles.wrapper}>
        <h2>Что-то пошло не так! Возникла ошибка!</h2>
        <Link
          to={paths.MAIN}
          onClick={() => this.setState((state) => ({ ...state, hasError: false }))}
        >
          Вернуться
        </Link>
      </div>
    );
  }
}

export default ErrorBoundary;
