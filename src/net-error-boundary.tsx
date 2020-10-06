import { Result } from 'antd';
import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryStates {
  readonly hasError: boolean;
}

class NetErrorBoundary extends Component<unknown, ErrorBoundaryStates> {
  state: ErrorBoundaryStates = { hasError: false };

  static getDerivedStateFromError(): Partial<ErrorBoundaryStates> {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="网络错误"
          subTitle="无法载入内容，请检查你的网络状况"
        />
      );
    }
    return this.props.children;
  }
}

export default NetErrorBoundary;
