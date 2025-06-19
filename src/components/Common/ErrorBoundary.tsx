import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
              <p className="text-gray-600 mb-6">
                We apologize for the inconvenience. Please try refreshing the page.
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-500">Error details:</p>
                <pre className="text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
                  {this.state.error?.message || 'Unknown error'}
                </pre>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}