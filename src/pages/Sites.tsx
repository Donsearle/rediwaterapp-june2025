import React from 'react';
import { Plus } from 'lucide-react';

export function Sites() {
  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Sites
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Site
          </button>
        </div>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <p className="text-white/60 text-center py-12">
          Site management will be implemented in the next sprint
        </p>
      </div>
    </div>
  );
}