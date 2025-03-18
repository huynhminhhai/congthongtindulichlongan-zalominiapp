import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { openUrlInWebview } from 'services/zalo';

interface Location {
  lat: number;
  lng: number;
  name: string;
  address: string;
  img: string;
  markerImg: string;
}

interface Props {
  location: Location;
}

const SingleLocationMap: React.FC<Props> = ({ location }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

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
      iconUrl: location.markerImg,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    markerRef.current = L.marker([location.lat, location.lng], { icon: customIcon })
      .addTo(mapRef.current)
      .bindPopup(`
        <div style="width: 180px">
          <img style="width: 100%; height: 100px; object-fit: cover" src="${location.img}" alt="${location.name}" />
          <div style="padding-block: 6px;">
            <div style="color: #355933; font-size: 13px; font-weight: 700; margin-bottom: 2px;">${location.name}</div>
            <div style="font-size: 11px;">
              <div style="margin-bottom: 4px;"><strong>Địa chỉ:</strong> ${location.address}</div>
              <button style="line-height: 1; padding: 6px; background-color: #355933; border-radius: 4px; color: #fff;" class="google-maps-link">Chỉ đường</button>
            </div>
          </div>
        </div>
      `).openPopup();

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
    await openUrlInWebview(googleMapsUrl, 'bottomSheet');  // Sử dụng hàm openUrlInWebview để mở Google Maps
  };

  return <div id="map" style={{ height: '400px' }}></div>;
};

export default SingleLocationMap;
