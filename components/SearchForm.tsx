import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useLandStore } from '../store/landStore';

export const SearchForm: React.FC = () => {
  const [searchNumber, setSearchNumber] = useState('');
  const [titleDeedNumber, setTitleDeedNumber] = useState('');
  const { searchLands, loading, error, clearError } = useLandStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!searchNumber.trim() && !titleDeedNumber.trim()) {
      return;
    }

    await searchLands(
      searchNumber.trim() || undefined,
      titleDeedNumber.trim() || undefined
    );
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Land Registry Search</h1>
      <p className="text-gray-600 mb-6">Search for land by search number or title deed number</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Number
            </label>
            <input
              type="text"
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
              placeholder="e.g., KE-000001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title Deed Number
            </label>
            <input
              type="text"
              value={titleDeedNumber}
              onChange={(e) => setTitleDeedNumber(e.target.value)}
              placeholder="e.g., KE/10001/001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <SearchIcon size={20} />
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
};
