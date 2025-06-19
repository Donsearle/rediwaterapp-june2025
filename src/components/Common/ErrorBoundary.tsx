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
        <div className="h-full flex items-center justify-center">
          <div className="max-w-md w-full bg-slate-800/90 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
              <p className="text-white/70 mb-6">
                We apologize for the inconvenience. Please try refreshing the page.
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-white/60">Error details:</p>
                <pre className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded overflow-auto">
                  {this.state.error?.message || 'Unknown error'}
                </pre>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
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