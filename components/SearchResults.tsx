import React from 'react';
import { Land } from '../store/landStore';
import { MapPin } from 'lucide-react';

interface SearchResultsProps {
  lands: Land[];
  selectedLand: Land | null;
  onSelectLand: (land: Land) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  lands,
  selectedLand,
  onSelectLand,
}) => {
  if (lands.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Search Results ({lands.length} found)
      </h2>

      <div className="space-y-3">
        {lands.map((land) => (
          <button
            key={land.id}
            onClick={() => onSelectLand(land)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedLand?.id === land.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 bg-gray-50 hover:border-blue-400'
            }`}
          >
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 flex-shrink-0" size={20} />
              <div className="flex-grow">
                <p className="font-semibold text-gray-800">{land.search_number}</p>
                <p className="text-sm text-gray-600">Deed: {land.title_deed_number}</p>
                <p className="text-sm text-gray-600">{land.location_description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {land.county} • {land.land_type} • {land.size_acres?.toFixed(2)} acres
                </p>
                {land.current_owner && (
                  <p className="text-xs text-blue-600 mt-1">
                    Owner: {land.current_owner.first_name} {land.current_owner.last_name}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
