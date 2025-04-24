import L from 'leaflet';

import 'leaflet-routing-machine';

import React, { useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import images from 'assets/images';

const customIcon = new L.Icon({
  iconUrl: images.markerBus,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const RoutingMachine = ({ busStops }: { busStops: any[] }) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    if (!map || busStops.length < 2) return;

    // Xoá routing cũ nếu có
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }

    const waypoints = busStops.map((stop: any) => L.latLng(parseFloat(stop.lat), parseFloat(stop.lng)));

    // Tạo routing mới
    const control = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      createMarker: () => null, // không thêm marker mặc định
    }).addTo(map);

    routingControlRef.current = control;

    return () => {
      map.removeControl(control);
    };
  }, [busStops, map]);

  return null;
};

const BusMap: React.FC<{ busStops: any[] }> = ({ busStops }) => {
  const getCenter = (busStops: { lat: string; lng: string }[]): [number, number] => {
    if (busStops.length === 0) return [10.7769, 106.7009];

    const sumLat = busStops.reduce((sum, stop) => sum + parseFloat(stop.lat), 0);
    const sumLng = busStops.reduce((sum, stop) => sum + parseFloat(stop.lng), 0);

    return [sumLat / busStops.length, sumLng / busStops.length];
  };

  const center = getCenter(busStops);

  return (
    <MapContainer center={center} zoom={10} style={{ height: '500px', width: '100%' }}>
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

      <RoutingMachine busStops={busStops} />
    </MapContainer>
  );
};

export default BusMap;
