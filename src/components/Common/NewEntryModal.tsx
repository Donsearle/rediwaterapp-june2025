import React from 'react';
import { X, Plus, Mountain, MapPin, Droplet } from 'lucide-react';

interface NewEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewEntryModal({ isOpen, onClose }: NewEntryModalProps) {
  if (!isOpen) return null;

  const handleAddMine = () => {
    console.log('Add Mine clicked');
    // TODO: Navigate to add mine form or open mine form modal
    onClose();
  };

  const handleAddSite = () => {
    console.log('Add Site clicked');
    // TODO: Navigate to add site form or open site form modal
    onClose();
  };

  const handleAddBorehole = () => {
    console.log('Add Borehole clicked');
    // TODO: Navigate to add borehole form or open borehole form modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800/90 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">New Entry</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <p className="text-sm text-white/60 mb-4">
            Choose what you'd like to add to the water management system:
          </p>

          {/* Add Mine Option */}
          <button
            onClick={handleAddMine}
            className="w-full flex items-center gap-4 p-4 bg-slate-700/50 hover:bg-slate-700/70 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200"
          >
            <div className="h-10 w-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Mountain className="h-5 w-5 text-purple-400" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-medium text-white">Add Mine</h4>
              <p className="text-sm text-white/60">Create a new mining operation</p>
            </div>
            <Plus className="h-4 w-4 text-white/40" />
          </button>

          {/* Add Site Option */}
          <button
            onClick={handleAddSite}
            className="w-full flex items-center gap-4 p-4 bg-slate-700/50 hover:bg-slate-700/70 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200"
          >
            <div className="h-10 w-10 bg-cyan-600/20 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-medium text-white">Add Site</h4>
              <p className="text-sm text-white/60">Register a new monitoring site</p>
            </div>
            <Plus className="h-4 w-4 text-white/40" />
          </button>

          {/* Add Borehole Option */}
          <button
            onClick={handleAddBorehole}
            className="w-full flex items-center gap-4 p-4 bg-slate-700/50 hover:bg-slate-700/70 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200"
          >
            <div className="h-10 w-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Droplet className="h-5 w-5 text-blue-400" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-medium text-white">Add Borehole</h4>
              <p className="text-sm text-white/60">Add a new borehole for monitoring</p>
            </div>
            <Plus className="h-4 w-4 text-white/40" />
          </button>
        </div>

        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-xs text-white/40 text-center">
            Use <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-xs">⌘N</kbd> to quickly open this menu
          </p>
        </div>
      </div>
    </div>
  );
}