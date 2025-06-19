import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import {
  HomeIcon,
  MapIcon,
  CogIcon,
  DocumentArrowUpIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, roles: ['admin', 'editor', 'viewer'] },
  { name: 'Boreholes', href: '/boreholes', icon: MapIcon, roles: ['admin', 'editor', 'viewer'] },
  { name: 'Sites', href: '/sites', icon: ChartBarIcon, roles: ['admin', 'editor', 'viewer'] },
  { name: 'Import/Export', href: '/data', icon: DocumentArrowUpIcon, roles: ['admin', 'editor'] },
  { name: 'Users', href: '/users', icon: UserGroupIcon, roles: ['admin'] },
  { name: 'Settings', href: '/settings', icon: CogIcon, roles: ['admin'] },
];

export function Sidebar() {
  const { user } = useAuthStore();

  const filteredNavigation = navigation.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-sm">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-xl font-bold text-gray-900">RediwaterApp</h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {filteredNavigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`
                      }
                    >
                      <item.icon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}