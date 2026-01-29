import React from 'react';
import { Land, OwnershipHistory } from '../store/landStore';
import { MapPin, User, FileText, History } from 'lucide-react';

interface LandDetailsProps {
  land: Land;
}

export const LandDetails: React.FC<LandDetailsProps> = ({ land }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Land Information Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Land Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Search Number</label>
            <p className="text-lg font-semibold text-gray-800">{land.search_number}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Title Deed Number</label>
            <p className="text-lg font-semibold text-gray-800">{land.title_deed_number}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Land Type</label>
            <p className="text-lg font-semibold text-gray-800">{land.land_type}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Size</label>
            <p className="text-lg font-semibold text-gray-800">
              {land.size_acres?.toFixed(2)} acres / {land.size_hectares?.toFixed(2)} hectares
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <p className="text-lg font-semibold text-gray-800">{land.location_description}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">County</label>
            <p className="text-lg font-semibold text-gray-800">{land.county}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Sub-County</label>
            <p className="text-lg font-semibold text-gray-800">{land.sub_county}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Ward</label>
            <p className="text-lg font-semibold text-gray-800">{land.ward}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Coordinates</label>
            <p className="text-lg font-semibold text-gray-800">
              {land.latitude?.toFixed(4)}, {land.longitude?.toFixed(4)}
            </p>
          </div>
        </div>
      </div>

      {/* Current Owner Card */}
      {land.current_owner && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <User size={24} className="text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800">Current Owner</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <p className="text-lg font-semibold text-gray-800">
                {land.current_owner.first_name} {land.current_owner.last_name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <p className="text-lg font-semibold text-gray-800">
                {land.current_owner.email || 'N/A'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Phone</label>
              <p className="text-lg font-semibold text-gray-800">
                {land.current_owner.phone || 'N/A'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">ID Number</label>
              <p className="text-lg font-semibold text-gray-800">
                {land.current_owner.id_number || 'N/A'}
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600">Acquisition Date</label>
              <p className="text-lg font-semibold text-gray-800">
                {formatDate(land.current_owner.acquired_date)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ownership History Timeline */}
      {land.ownership_history && land.ownership_history.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <History size={24} className="text-green-600" />
            <h3 className="text-xl font-bold text-gray-800">Ownership History</h3>
          </div>

          <div className="space-y-4">
            {land.ownership_history.map((record: OwnershipHistory, index: number) => (
              <div key={record.id} className="pb-4 border-l-2 border-gray-300 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {record.owner_name || record.business_name}
                    </p>
                    <p className="text-sm text-gray-600">{record.transaction_type}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Entry {index + 1}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-gray-600">Acquired</label>
                    <p className="font-medium text-gray-800">
                      {formatDate(record.acquired_date)}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-600">Disposed</label>
                    <p className="font-medium text-gray-800">
                      {record.disposed_date ? formatDate(record.disposed_date) : 'Ongoing'}
                    </p>
                  </div>
                </div>

                {record.notes && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p className="italic">{record.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
