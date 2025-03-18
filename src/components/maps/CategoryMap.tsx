import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-search/dist/leaflet-search.min.css';
import { openUrlInWebview } from 'services/zalo';

interface Location {
  lat: number;
  lng: number;
  name: string;
  address: string;
  img: string;
}

const CategoryMap: React.FC<any> = ({locations, iconMarker}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup>(L.layerGroup());

  const icon = L.icon({
    iconUrl: iconMarker || 'https://cdn-icons-png.flaticon.com/128/948/948036.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    import('leaflet-search').then(() => {
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([locations[0].lat, locations[0].lng], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(mapRef.current);

        markersRef.current.addTo(mapRef.current);
      }
      loadMarkers();
    }).catch((err) => {
      console.error('Failed to load leaflet-search:', err);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const loadMarkers = () => {
    if (!mapRef.current) return;

    markersRef.current.clearLayers();

    const bounds = L.latLngBounds(locations.map((item) => [item.lat, item.lng]));

    locations.forEach((item) => {
      const marker = L.marker([item.lat, item.lng], { icon, title: item.name })
        .addTo(markersRef.current)
        .bindPopup(`
          <div style="width: 180px">
            <img style="width: 100%; height: 100px" src="${item.img}" alt="${item.name}" />
            <div style="padding-block: 6px;">
              <div style="color: #355933; font-size: 15px; font-weight: 600;">${item.name}</div>
              <div style="font-size: 11px;"><strong>Địa chỉ:</strong> ${item.address}</div>
              <button style="margin-top:6px; background:#355933; color:white; padding:6px; border-radius:4px;" class="google-maps-link">Chỉ đường</button>
            </div>
          </div>
        `);

      marker.on('popupopen', () => {
        const googleMapsLink = (marker.getPopup() as any).getElement()?.querySelector('.google-maps-link');
        if (googleMapsLink) {
          googleMapsLink.addEventListener('click', () => openGoogleMaps(item.lat, item.lng));
        }
      });
    });

    if (bounds.isValid()) {
      mapRef.current.fitBounds(bounds, { paddingTopLeft: [0, 100], maxZoom: 14 });
    }
  };

  const openGoogleMaps = async (lat: number, lng: number) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    await openUrlInWebview(googleMapsUrl, 'bottomSheet');
  };

  const handleItemClick = (lat: number, lng: number) => {
    if (!mapRef.current) return;

    mapRef.current.setView([lat, lng], 15);
    markersRef.current.eachLayer((marker: any) => {
      const markerLatLng = marker.getLatLng();
      if (markerLatLng.lat === lat && markerLatLng.lng === lng) {
        marker.openPopup();
      }
    });
  };

  return (
    <div className="map-wrap">
      <div className="sidebar p-2 flex flex-col gap-2 max-h-[160px] overflow-y-auto mb-4">
        {locations.map((item, index) => (
          <div key={index} className="flex gap-2 cursor-pointer" onClick={() => handleItemClick(item.lat, item.lng)}>
            <img className="w-[80px] h-[60px] object-cover" src={item.img} alt={item.name} />
            <div>
              <div className="text-[16px] font-bold text-[#355933]">{item.name}</div>
              <div className="text-[12px]">{item.address}</div>
            </div>
          </div>
        ))}
      </div>
      <div id="map" style={{ height: '400px' }}></div>
    </div>
  );
};

export default CategoryMap;
