import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "polyline-encoded"; // Giải mã tuyến đường
import images from "assets/images";

const customIcon = new L.Icon({
    iconUrl: images.markerBus,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

const BusMap: React.FC<{ busStops: any }> = ({ busStops }) => {
    const [route, setRoute] = useState<[number, number][]>([]);

    useEffect(() => {
        const fetchRoute = async () => {
            if (busStops.length < 2) return;

            const coordinates = busStops.map((stop) => `${stop.lng},${stop.lat}`).join(";");
            const url = `http://router.project-osrm.org/route/v1/driving/${coordinates}?geometries=polyline`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.routes && data.routes.length > 0) {
                    const decoded = polyline.decode(data.routes[0].geometry); // Giải mã tuyến đường
                    setRoute(decoded.map(([lat, lng]) => [lat, lng])); // Chuyển đổi thành mảng tọa độ Leaflet
                }
            } catch (error) {
                console.error("Error fetching route:", error);
            }
        };

        fetchRoute();
    }, [busStops]);

    const getCenter = (busStops: { lat: number; lng: number }[]): [number, number] => {
        if (busStops.length === 0) return [10.7769, 106.7009]; // Tọa độ mặc định (TP.HCM)

        const sumLat = busStops.reduce((sum, stop) => sum + stop.lat, 0);
        const sumLng = busStops.reduce((sum, stop) => sum + stop.lng, 0);

        return [sumLat / busStops.length, sumLng / busStops.length]; // Trả về tuple [lat, lng]
    };

    const center = getCenter(busStops);

    return (
        <MapContainer center={center} zoom={10} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />

            {busStops.map((stop, index) => (
                <Marker key={index} position={[stop.lat, stop.lng]} icon={customIcon}>
                    <Popup>{stop.name}</Popup>
                </Marker>
            ))}

            {/* Vẽ tuyến đường theo OSRM */}
            {route.length > 0 && <Polyline positions={route} color="#355933" weight={5} />}
        </MapContainer>
    );
};

export default BusMap;
