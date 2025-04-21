import L from 'leaflet';
import React, { useEffect, useRef } from 'react';

import 'leaflet/dist/leaflet.css';
import 'leaflet-search/dist/leaflet-search.min.css';

import { openUrlInWebview } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { formatImageSrc } from 'utils';

interface Location {
  lat: number;
  lng: number;
  name: string;
  address: string;
  img: string;
}

const CategoryMap: React.FC<any> = ({ locations, iconMarker }) => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup>(L.layerGroup());

  const icon = L.icon({
    iconUrl: iconMarker || 'https://cdn-icons-png.flaticon.com/128/948/948036.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    import('leaflet-search')
      .then(() => {
        if (!mapRef.current) {
          mapRef.current = L.map('map').setView([locations[0].lat, locations[0].lng], 10);

          L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>',
          }).addTo(mapRef.current);

          markersRef.current.addTo(mapRef.current);
        }
        loadMarkers();
      })
      .catch(err => {
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

    const bounds = L.latLngBounds(locations.map(item => [item.lat, item.lng]));

    locations.forEach(item => {
      const marker = L.marker([item.lat, item.lng], { icon, title: item.name }).addTo(markersRef.current).bindPopup(`
          <div style="width: 180px">
            <img style="width: 100%; height: 100px" src="${formatImageSrc(item.image)}" alt="${item.name}" />
            <div style="padding-block: 6px;">
              <div style="color: #355933; font-size: 15px; font-weight: 600;">${item.name}</div>
              <div style="font-size: 11px;"><strong>${t['Address']}:</strong> ${item.address}</div>
              <button style="margin-top:6px; background:#355933; color:white; padding:6px; border-radius:4px;" class="google-maps-link">${t['Directions']}</button>
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
      <div className="sidebar flex flex-col gap-2 max-h-[220px] overflow-y-auto mb-4">
        {locations &&
          locations.map((item, index) => (
            <div key={index} className="flex gap-2" onClick={() => handleItemClick(item.lat, item.lng)}>
              <img className="w-[100px] h-[60px] object-cover" src={item.img} alt={item.name} />
              <div className="flex-1">
                <div className="text-[16px] leading-[24px] font-bold text-[#355933] line-clamp-1">{item.name}</div>
                <div className="text-[12px] leading-[16px] font-medium line-clamp-2">{item.address}</div>
              </div>
            </div>
          ))}
      </div>
      <div id="map" style={{ height: '500px' }}></div>
    </div>
  );
};

export default CategoryMap;
