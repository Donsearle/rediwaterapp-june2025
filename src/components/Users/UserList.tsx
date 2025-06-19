import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { useUsers } from '../../hooks/useUsers';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { UserForm } from './UserForm';
import { ConfirmDialog } from '../Common/ConfirmDialog';
import { dateUtils, stringUtils } from '../../lib/utils';
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
          <h1 className="text-2xl font-bold leading-7 text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage user accounts and permissions for the water management platform.
          </p>
        </div>
        {canManageUsers && (
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add User
            </button>
          </div>
        )}
      </div>

      {/* Backend Implementation Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Backend Implementation Required
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                User management operations (creating and deleting users) require a secure backend implementation 
                using Supabase Edge Functions with admin privileges. Currently, only role updates may work 
                depending on your RLS policies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Created
                </th>
                {canManageUsers && (
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800'
                        : user.role === 'editor'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dateUtils.formatForDisplay(user.created_at)}
                  </td>
                  {canManageUsers && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-500"
                          title="Edit user role"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="text-red-600 hover:text-red-500 opacity-50 cursor-not-allowed"
                          title="Delete user (requires backend implementation)"
                          disabled
                        >
                          <TrashIcon className="h-4 w-4" />
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
              <p className="text-gray-500">No users found.</p>
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
          confirmButtonClass="bg-gray-600 hover:bg-gray-500"
          onConfirm={() => setDeletingUser(null)}
          onCancel={() => setDeletingUser(null)}
          isLoading={false}
        />
      )}
    </div>
  );
}