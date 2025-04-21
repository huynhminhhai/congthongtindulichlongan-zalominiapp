import L from 'leaflet';
import React, { useEffect, useRef } from 'react';

import 'leaflet/dist/leaflet.css';

import { MapType } from 'apiRequest/map/type';
import LocationPointer from 'assets/images/location-pointer.png';
import { openUrlInWebview } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { formatImageSrc } from 'utils';

interface Props {
  location: MapType;
}

const SingleLocationMap: React.FC<Props> = ({ location }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([location.lat, location.lng], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapRef.current);
    } else {
      mapRef.current.setView([location.lat, location.lng], 15);
    }

    if (markerRef.current) {
      markerRef.current.remove();
    }

    const customIcon = L.icon({
      iconUrl: location.icon || LocationPointer,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    markerRef.current = L.marker([location.lat, location.lng], { icon: customIcon })
      .addTo(mapRef.current)
      .bindPopup(
        `
        <div style="width: 180px">
          <img style="width: 100%; height: 100px; object-fit: cover" src="${formatImageSrc(location.image)}" alt="${location.name}" />
          <div style="padding-block: 6px;">
            <div style="color: #355933; font-size: 13px; font-weight: 700; margin-bottom: 2px;">${location.name}</div>
            <div style="font-size: 11px;">
              <div style="margin-bottom: 4px;"><strong>${t['Address']}:</strong> ${location.address}</div>
              <button style="line-height: 1; padding: 6px; background-color: #355933; border-radius: 4px; color: #fff;" class="google-maps-link">${t['Directions']}</button>
            </div>
          </div>
        </div>
      `
      )
      .openPopup();

    const googleMapsLink = document.querySelector('.google-maps-link');
    if (googleMapsLink) {
      googleMapsLink.addEventListener('click', openGoogleMaps);
    }

    return () => {
      if (googleMapsLink) {
        googleMapsLink.removeEventListener('click', openGoogleMaps);
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [location]);

  const openGoogleMaps = async () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
    await openUrlInWebview(googleMapsUrl, 'bottomSheet'); // Sử dụng hàm openUrlInWebview để mở Google Maps
  };

  return <div id="map" style={{ height: '500px', zIndex: 1 }}></div>;
};

export default SingleLocationMap;
