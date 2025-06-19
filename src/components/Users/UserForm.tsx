import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useUsers } from '../../hooks/useUsers';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import type { User } from '../../types';

const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  role: z.enum(['admin', 'editor', 'viewer'], {
    required_error: 'Please select a role',
  }),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: User | null;
  onClose: () => void;
}

export function UserForm({ user, onClose }: UserFormProps) {
  const { createUser, updateUser, isCreating, isUpdating } = useUsers();
  const isEditing = !!user;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: user?.email || '',
      role: user?.role || 'viewer',
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEditing && user) {
        await updateUser({
          id: user.id,
          role: data.role,
        });
      } else {
        if (!data.password) {
          throw new Error('Password is required for new users');
        }
        await createUser({
          email: data.email,
          password: data.password,
          role: data.role,
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
      // Show error to user - in a real app, you'd want proper error handling UI
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Edit User Role' : 'Add New User'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {!isEditing && (
          <div className="p-6 bg-yellow-50 border-b border-yellow-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  User creation requires backend implementation with admin privileges. 
                  This form will not work in the current client-side setup.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              disabled={isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {!isEditing && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                disabled={true}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Requires backend implementation"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              {...register('role')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="viewer">Viewer - Read-only access</option>
              <option value="editor">Editor - Can manage borehole data</option>
              <option value="admin">Admin - Full access</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading || !isEditing}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditing ? 'Update Role' : 'Create User (Disabled)'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}