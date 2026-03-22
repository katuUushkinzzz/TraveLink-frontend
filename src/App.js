import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function App() {
  return (
    <MapContainer
      center={[47.210, 38.925]}
      zoom={14}
      zoomControl={false}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <ZoomControl position="topright" />
    </MapContainer>
  );
}