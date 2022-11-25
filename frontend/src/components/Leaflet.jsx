import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import PropTypes, { number } from "prop-types";

import getData, { getdetails } from "../data/api";

export default function Leaflet() {
  const [pointer, setpointer] = useState([]);
  const [data, setData] = useState([]);
  // https://api.opentripmap.com/0.1/en/places/radius?radius=50000&lon=4.0692652984249476&lat=47.9811325165939&kinds=cultural&apikey=5ae2e3f221c38a28845f05b672f12987087d7275fb9e12b59b197eaf

  useEffect(() => {
    const fetchData = async () => {
      const sites = await getData(pointer[0], pointer[1]);
      setData(sites);
    };

    if (pointer.length > 0) {
      fetchData();
    }
  }, [pointer]);

  console.warn(data);
  return (
    <MapContainer
      className="leafletcontener"
      center={[46.227638, 2.213749]}
      zoom={6}
      scrollWheelZoom
    >
      {pointer.length > 0 && <ChangeView center={pointer} />}

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((marker) => (
        <Marker
          key={marker.xid}
          position={[marker.point.lat, marker.point.lon]}
        >
          <Popup>
            <h2>{marker.name}</h2>
          </Popup>
        </Marker>
      ))}
      <MyComponent setpointer={setpointer} />
    </MapContainer>
  );
}

function MyComponent({ setpointer }) {
  useMapEvents({
    click: (e) => {
      setpointer([e.latlng.lat, e.latlng.lng]);
      getdetails("N3254769225");
    },
  });
}

function ChangeView(props) {
  const { center } = props;
  const map = useMap();
  map.setView(center, map.getZoom());
  map.setZoom(9);
  return null;
}
ChangeView.propTypes = {
  center: PropTypes.arrayOf(number).isRequired,
  zoom: PropTypes.number.isRequired,
}.isRequired;
