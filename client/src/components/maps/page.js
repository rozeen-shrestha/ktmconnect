import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Routing from '../routing/page';
  // Ensure the correct path to the Routing component

const Map = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=21a3d294e6774f028487e06c7fb008d8"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Routing />
    </MapContainer>
  );
};

export default Map;
