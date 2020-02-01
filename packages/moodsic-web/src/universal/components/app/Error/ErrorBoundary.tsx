/* eslint-disable react/prefer-stateless-function */
import { logger } from 'jege';
import React from 'react';

const log = logger('[sandbox-web]');

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    log('ErrorBoundary(): error: %o, info: %o', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
