import React from 'react';
import { MoreHorizontal, Circle } from 'lucide-react';

const mockArtists = [
  {
    id: 1,
    name: 'Site Alpha',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Production',
    status: 'Online',
    location: 'North Region',
    statusColor: 'bg-green-500/20 text-green-300',
  },
  {
    id: 2,
    name: 'Site Beta',
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Monitoring ★',
    status: 'Maintenance',
    location: 'Central Region',
    statusColor: 'bg-yellow-500/20 text-yellow-300',
  },
  {
    id: 3,
    name: 'Site Gamma',
    image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Research',
    status: 'Online',
    location: 'South Region',
    statusColor: 'bg-green-500/20 text-green-300',
  },
  {
    id: 4,
    name: 'Site Delta',
    image: 'https://images.pexels.com/photos/1878522/pexels-photo-1878522.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Analysis ★',
    status: 'Offline',
    location: 'East Region',
    statusColor: 'bg-gray-500/20 text-gray-300',
  },
];

export function ArtistsTable() {
  return (
    <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-white/60 border-b border-white/10">
            <tr>
              <th className="py-4 px-3 lg:px-5">Site</th>
              <th className="py-4 px-3 lg:px-5 hidden sm:table-cell">Type</th>
              <th className="py-4 px-3 lg:px-5 hidden md:table-cell">Status</th>
              <th className="py-4 px-3 lg:px-5 hidden lg:table-cell">Location</th>
              <th className="py-4 px-3 lg:px-5"></th>
            </tr>
          </thead>
          <tbody>
            {mockArtists.map((artist) => (
              <tr key={artist.id} className="hover:bg-white/5 transition">
                <td className="py-3 px-3 lg:px-5 flex items-center gap-2">
                  <img src={artist.image} className="h-6 w-6 rounded-full object-cover" alt="" />
                  <span className="truncate">{artist.name}</span>
                </td>
                <td className="py-3 px-3 lg:px-5 hidden sm:table-cell">{artist.genre}</td>
                <td className="py-3 px-3 lg:px-5 hidden md:table-cell">
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${artist.statusColor}`}>
                    <Circle className="h-2 w-2 fill-current" />
                    {artist.status}
                  </span>
                </td>
                <td className="py-3 px-3 lg:px-5 hidden lg:table-cell">{artist.location}</td>
                <td className="py-3 px-3 lg:px-5 text-right">
                  <MoreHorizontal className="h-4 w-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}