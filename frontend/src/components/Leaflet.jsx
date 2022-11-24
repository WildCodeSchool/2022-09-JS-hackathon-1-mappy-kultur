import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MyComponent() {
  useMapEvents({
    click: (e) => {
      console.warn(e.latlng);
    },
  });
}

export default function Leaflet() {
  return (
    <MapContainer
      className="leafletcontener"
      center={[46.227638, 2.213749]}
      zoom={6}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[46.227638, 2.213749]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <MyComponent />
    </MapContainer>
  );
}
