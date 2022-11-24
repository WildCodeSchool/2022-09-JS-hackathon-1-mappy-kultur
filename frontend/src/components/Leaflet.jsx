import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import PropTypes, { number } from "prop-types";

import getData from "../data/api";

export default function Leaflet() {
  const [pointer, setpointer] = useState([]);
  // https://api.opentripmap.com/0.1/en/places/radius?radius=50000&lon=4.0692652984249476&lat=47.9811325165939&kinds=cultural&apikey=5ae2e3f221c38a28845f05b672f12987087d7275fb9e12b59b197eaf
  return (
    <MapContainer
      className="leafletcontener"
      center={[46.227638, 2.213749]}
      zoom={6}
      scrollWheelZoom
    >
      {pointer.length > 0 && <ChangeView center={pointer} zoom={9} />}

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[46.227638, 2.213749]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <MyComponent setpointer={setpointer} />
    </MapContainer>
  );
}

function MyComponent({ setpointer }) {
  useMapEvents({
    click: (e) => {
      console.warn(e.latlng);
      setpointer([e.latlng.lat, e.latlng.lng]);
      getData(e.latlng.lat, e.latlng.lng);
    },
  });
}

function ChangeView(props) {
  const { center, zoom } = props;
  const map = useMap();
  map.setView(center, zoom);
  return null;
}
ChangeView.propTypes = {
  center: PropTypes.arrayOf(number).isRequired,
  zoom: PropTypes.number.isRequired,
}.isRequired;
