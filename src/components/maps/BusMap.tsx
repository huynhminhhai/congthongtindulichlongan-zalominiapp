import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import images from 'assets/images';

const customIcon = new L.Icon({
    iconUrl: images.markerBus,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});

const BusMap: React.FC<{busStops: any}> = ({busStops}) => {
    return (
        <MapContainer center={[busStops[0].lat, busStops[0].lng]} zoom={15} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
            
            {busStops.map((stop, index) => (
                <Marker key={index} position={[stop.lat, stop.lng]} icon={customIcon}>
                    <Popup>{stop.name}</Popup>
                </Marker>
            ))}
            
            <Polyline positions={busStops.map(stop => [stop.lat, stop.lng])} color="red" weight={5} />
        </MapContainer>
    );
};

export default BusMap;
