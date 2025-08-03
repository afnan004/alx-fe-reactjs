// src/components/ErrorBoundary.jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <div className="error-fallback">Something went wrong</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;