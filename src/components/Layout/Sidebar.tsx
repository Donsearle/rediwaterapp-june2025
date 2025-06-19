import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { LayoutDashboard, Map, Settings, Upload, Users, BarChart, Plus, AudioWaveform as Waveform } from 'lucide-react';
import { NewEntryModal } from '../Common/NewEntryModal';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'editor', 'viewer'] },
  { name: 'Boreholes', href: '/boreholes', icon: Map, roles: ['admin', 'editor', 'viewer'] },
  { name: 'Sites', href: '/sites', icon: BarChart, roles: ['admin', 'editor', 'viewer'] },
  { name: 'Import/Export', href: '/data', icon: Upload, roles: ['admin', 'editor'] },
  { name: 'Users', href: '/users', icon: Users, roles: ['admin'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user } = useAuthStore();
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);

  const filteredNavigation = navigation.filter(item => 
    user && item.roles.includes(user.role)
  );

  // Handle keyboard shortcut (Cmd+N / Ctrl+N)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'n') {
        event.preventDefault();
        setShowNewEntryModal(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNewEntryClick = () => {
    setShowNewEntryModal(true);
  };

  const handleCloseModal = () => {
    setShowNewEntryModal(false);
  };

  return (
    <>
      <aside className={`fixed lg:relative inset-y-0 left-0 z-40 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col gap-6 border-r border-white/10 bg-slate-900/50 backdrop-blur-lg p-6`}>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <Waveform className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">RediwaterApp</span>
        </div>

        <button 
          onClick={handleNewEntryClick}
          className="flex items-center justify-between gap-3 text-sm font-medium bg-blue-600/20 hover:bg-blue-600/30 transition p-3 rounded-lg"
        >
          <span className="flex items-center gap-3">
            <Plus className="h-4 w-4" />
            New Entry
          </span>
          <kbd className="text-xs text-white/60 hidden sm:block">⌘N</kbd>
        </button>

        <nav className="flex flex-col gap-1 text-sm">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-white/10'
                    : 'hover:bg-white/10'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-4 rounded-xl">
          <p className="text-sm leading-snug">
            Upgrade to <span className="font-semibold text-cyan-400">Professional</span> for 
            unlimited data storage and advanced analytics!
          </p>
          <div className="flex items-center justify-between mt-4 text-sm">
            <button className="hover:underline text-white/70">Maybe Later</button>
            <button className="bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded-md font-medium">
              Go Pro
            </button>
          </div>
        </div>
      </aside>

      {/* New Entry Modal */}
      <NewEntryModal 
        isOpen={showNewEntryModal}
        onClose={handleCloseModal}
      />
    </>
  );
}