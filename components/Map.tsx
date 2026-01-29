import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Land } from '../store/landStore';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapProps {
  lands: Land[];
  selectedLand: Land | null;
}

export const Map: React.FC<MapProps> = ({ lands, selectedLand }) => {
  const center = selectedLand
    ? [selectedLand.latitude, selectedLand.longitude]
    : [-1.2865, 36.8172]; // Default Kenya center

  const zoom = selectedLand ? 15 : 6;

  return (
    <MapContainer
      center={[center[0], center[1]]}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      key={`${center[0]}-${center[1]}-${zoom}`}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {lands.map((land) => (
        <Marker
          key={land.id}
          position={[land.latitude, land.longitude]}
          icon={defaultIcon}
        >
          <Popup>
            <div className="p-2">
              <p className="font-bold">{land.search_number}</p>
              <p className="text-sm">{land.location_description}</p>
              <p className="text-xs text-gray-600">{land.county}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
