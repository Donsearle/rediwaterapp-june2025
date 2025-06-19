import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline';

export function Header() {
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900">
              <UserIcon className="h-6 w-6" />
              <span className="sr-only sm:not-sr-only">{user?.email}</span>
              <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 capitalize">
                {user?.role}
              </span>
              <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="sr-only">Open user menu</span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleSignOut}
                      className={`block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900 ${
                        active ? 'bg-gray-50' : ''
                      }`}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}