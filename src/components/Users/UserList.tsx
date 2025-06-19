import React, { useState } from 'react';
import { Plus, Pencil, Trash, TriangleAlert } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUsers } from '../../hooks/useUsers';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { UserForm } from './UserForm';
import { ConfirmDialog } from '../Common/ConfirmDialog';
import { dateUtils } from '../../lib/utils';
import type { User } from '../../types';

export function UserList() {
  const { hasPermission } = useAuth();
  const { users, isLoading, deleteUser, isDeleting } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const canManageUsers = hasPermission('canManageUsers');

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (user: User) => {
    setDeletingUser(user);
  };

  const confirmDelete = () => {
    if (deletingUser) {
      deleteUser(deletingUser.id);
      setDeletingUser(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold leading-7 text-white">Users</h1>
          <p className="mt-2 text-sm text-white/60">
            Manage user accounts and permissions for the water management platform.
          </p>
        </div>
        {canManageUsers && (
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add User
            </button>
          </div>
        )}
      </div>

      {/* Backend Implementation Notice */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <TriangleAlert className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-300">
              Backend Implementation Required
            </h3>
            <div className="mt-2 text-sm text-yellow-200/80">
              <p>
                User management operations (creating and deleting users) require a secure backend implementation 
                using Supabase Edge Functions with admin privileges. Currently, only role updates may work 
                depending on your RLS policies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-white/60 border-b border-white/10">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium uppercase tracking-wide">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium uppercase tracking-wide">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium uppercase tracking-wide">
                  Created
                </th>
                {canManageUsers && (
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      user.role === 'admin' 
                        ? 'bg-purple-500/20 text-purple-300'
                        : user.role === 'editor'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-gray-500/20 text-gray-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                    {dateUtils.formatForDisplay(user.created_at)}
                  </td>
                  {canManageUsers && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-400 hover:text-blue-300 transition"
                          title="Edit user role"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="text-red-400 hover:text-red-300 opacity-50 cursor-not-allowed transition"
                          title="Delete user (requires backend implementation)"
                          disabled
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60">No users found.</p>
            </div>
          )}
        </div>
      </div>

      {/* User Form Modal */}
      {showForm && (
        <UserForm
          user={editingUser}
          onClose={handleCloseForm}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deletingUser && (
        <ConfirmDialog
          isOpen={true}
          title="Delete User"
          message={`User deletion requires backend implementation with admin privileges. This operation is not available in the current client-side implementation.`}
          confirmLabel="Understood"
          confirmButtonClass="bg-slate-600 hover:bg-slate-500"
          onConfirm={() => setDeletingUser(null)}
          onCancel={() => setDeletingUser(null)}
          isLoading={false}
        />
      )}
    </div>
  );
}