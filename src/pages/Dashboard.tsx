import React from 'react';
import { TrendingUp } from 'lucide-react';
import { MonthlyRevenueChart } from '../components/Dashboard/MonthlyRevenueChart';
import { GenreDistributionChart } from '../components/Dashboard/GenreDistributionChart';
import { StudioUsageChart } from '../components/Dashboard/StudioUsageChart';
import { FrequencySpectrumChart } from '../components/Dashboard/FrequencySpectrumChart';
import { ArtistsTable } from '../components/Dashboard/ArtistsTable';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60">Total Boreholes</p>
              <p className="text-2xl font-semibold">247</p>
            </div>
            <div className="h-10 w-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60">Active Boreholes</p>
              <p className="text-2xl font-semibold">84</p>
            </div>
            <div className="h-10 w-10 bg-cyan-600/20 rounded-lg flex items-center justify-center">
              <svg className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60">Avg Water Level</p>
              <p className="text-2xl font-semibold">12.4m</p>
            </div>
            <div className="h-10 w-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60">Alerts</p>
              <p className="text-2xl font-semibold">3</p>
            </div>
            <div className="h-10 w-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Monthly Water Level Trends */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Monthly Water Level Trends</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12.5%
              </span>
              <select className="text-xs bg-slate-800/50 border border-white/10 rounded px-2 py-1">
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
          </div>
          <div className="h-48">
            <MonthlyRevenueChart />
          </div>
        </div>

        {/* Borehole Status Distribution */}
        <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="font-medium mb-4">Borehole Status Distribution</h2>
          <div className="h-48">
            <GenreDistributionChart />
          </div>
        </div>
      </div>

      {/* Weekly Usage & Sites table */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Readings Chart */}
        <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="font-medium mb-4">Weekly Readings (7 days)</h2>
          <div className="h-48">
            <StudioUsageChart />
          </div>
        </div>

        {/* Sites table */}
        <ArtistsTable />
      </div>

      {/* Water Level Distribution */}
      <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium">Water Level Distribution Analysis</h2>
          <button className="text-xs text-white/60 hover:text-white transition">View Details</button>
        </div>
        <div className="h-64">
          <FrequencySpectrumChart />
        </div>
      </div>
    </div>
  );
}