import { useAuthStore } from '../stores/authStore';
import { permissionUtils } from '../lib/utils';
import type { Permission } from '../types';

/**
 * Custom hook for authentication and authorization
 */
export function useAuth() {
  const { user, loading, signIn, signOut, signUp, initialize } = useAuthStore();

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return permissionUtils.hasPermission(user.role, permission);
  };

  const canPerformAction = (
    action: 'create' | 'read' | 'update' | 'delete',
    entity: 'boreholes' | 'sites' | 'users'
  ): boolean => {
    if (!user) return false;
    return permissionUtils.canPerformAction(user.role, action, entity);
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  const isEditor = (): boolean => {
    return user?.role === 'editor';
  };

  const isViewer = (): boolean => {
    return user?.role === 'viewer';
  };

  return {
    user,
    loading,
    signIn,
    signOut,
    signUp,
    initialize,
    hasPermission,
    canPerformAction,
    isAdmin,
    isEditor,
    isViewer,
    isAuthenticated: !!user,
  };
}