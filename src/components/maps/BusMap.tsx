import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import images from 'assets/images';
import polyline from 'polyline-encoded'; // Giải mã tuyến đường

const customIcon = new L.Icon({
  iconUrl: images.markerBus,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const BusMap: React.FC<{ busStops: any }> = ({ busStops }) => {
  console.log(busStops);
  const [route, setRoute] = useState<[number, number][]>([]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (busStops.length < 2) return;

      const coordinates = busStops.map(stop => `${parseFloat(stop.lng)},${parseFloat(stop.lat)}`).join(';');
      const url = `http://router.project-osrm.org/route/v1/driving/${coordinates}?geometries=polyline`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const decoded = polyline.decode(data.routes[0].geometry); // Giải mã tuyến đường
          setRoute(decoded.map(([lat, lng]) => [lat, lng])); // Chuyển đổi thành mảng tọa độ Leaflet
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    fetchRoute();
  }, [busStops]);

  const getCenter = (busStops: { lat: string; lng: string }[]): [number, number] => {
    if (busStops.length === 0) return [10.7769, 106.7009]; // Tọa độ mặc định (TP.HCM)

    const sumLat = busStops.reduce((sum, stop) => sum + parseFloat(stop.lat), 0);
    const sumLng = busStops.reduce((sum, stop) => sum + parseFloat(stop.lng), 0);

    return [sumLat / busStops.length, sumLng / busStops.length]; // Trả về tuple [lat, lng]
  };

  const center = getCenter(busStops);

  return (
    <MapContainer center={center} zoom={10} style={{ height: '500px', width: '100%', zIndex: 1 }}>
      <TileLayer
        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        maxZoom={19}
      />

      {busStops.map((stop, index) => (
        <Marker key={index} position={[parseFloat(stop.lat), parseFloat(stop.lng)]} icon={customIcon}>
          <Popup>{stop.name}</Popup>
        </Marker>
      ))}

      {/* Vẽ tuyến đường theo OSRM */}
      {route.length > 0 && <Polyline positions={route} color="#355933" weight={5} />}
    </MapContainer>
  );
};

export default BusMap;
