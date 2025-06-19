import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './stores/authStore';
import { ErrorBoundary } from './components/Common/ErrorBoundary';
import { LoginForm } from './components/Auth/LoginForm';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { AppLayout } from './components/Layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Boreholes } from './pages/Boreholes';
import { Sites } from './pages/Sites';
import { Users } from './pages/Users';
import { LoadingSpinner } from './components/Common/LoadingSpinner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { initialize, loading, user } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" replace /> : <LoginForm />} 
            />
            <Route 
              path="/" 
              element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/boreholes"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Boreholes />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sites"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Sites />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/data"
              element={
                <ProtectedRoute roles={['admin', 'editor']}>
                  <AppLayout>
                    <div className="p-6">Import/Export page - Coming soon</div>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AppLayout>
                    <Users />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AppLayout>
                    <div className="p-6">Settings - Coming soon</div>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;