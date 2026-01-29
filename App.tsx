import React from 'react';
import { useLandStore } from './store/landStore';
import { SearchForm } from './components/SearchForm';
import { SearchResults } from './components/SearchResults';
import { LandDetails } from './components/LandDetails';
import { Map } from './components/Map';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  const { lands, selectedLand, selectLand } = useLandStore();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">🗺️ Land Registry Portal</h1>
          <p className="text-blue-100 mt-2">Search and explore land records in Kenya</p>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Search and Details */}
          <div className="lg:col-span-1 space-y-6">
            <SearchForm />
            {lands.length > 0 && (
              <SearchResults
                lands={lands}
                selectedLand={selectedLand}
                onSelectLand={selectLand}
              />
            )}
            {selectedLand && (
              <div className="sticky top-6">
                <LandDetails land={selectedLand} />
              </div>
            )}
          </div>

          {/* Right Side - Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '600px' }}>
              {lands.length > 0 ? (
                <Map lands={lands} selectedLand={selectedLand} />
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌍</div>
                    <p className="text-gray-600 text-lg">Search for land to view on map</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 Land Registry Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
