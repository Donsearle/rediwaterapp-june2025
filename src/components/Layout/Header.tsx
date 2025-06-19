import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { ChevronDown, User, Bell, HelpCircle, Menu as MenuIcon } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={onToggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800/80 backdrop-blur-lg rounded-lg border border-white/10"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      <header className="flex items-center justify-between gap-4 px-4 lg:px-6 py-4 border-b border-white/10 bg-slate-900/30 backdrop-blur-lg">
        <div className="flex items-center gap-4">
          <div className="lg:hidden w-8"></div>
          <div>
            <h1 className="text-base lg:text-lg font-medium">Water Management Analytics</h1>
            <p className="text-xs lg:text-sm text-white/60">
              {user?.role === 'admin' ? 'Full access' : user?.role === 'editor' ? 'Data management' : 'Read-only access'} • {user?.role}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative hidden sm:block">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-cyan-500"></span>
          </button>
          <HelpCircle className="h-5 w-5 hidden sm:block" />
          
          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-x-2 text-sm font-semibold leading-6">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <span className="sr-only sm:not-sr-only">{user?.email}</span>
              <span className="ml-2 inline-flex items-center rounded-full bg-slate-800/50 px-2.5 py-0.5 text-xs font-medium text-white/80 capitalize border border-white/10">
                {user?.role}
              </span>
              <ChevronDown className="h-5 w-5 text-white/60" aria-hidden="true" />
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
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-slate-800/90 backdrop-blur-lg py-2 shadow-lg ring-1 ring-white/10 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleSignOut}
                      className={`block w-full px-3 py-1 text-left text-sm leading-6 text-white/90 ${
                        active ? 'bg-white/10' : ''
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
      </header>
    </>
  );
}