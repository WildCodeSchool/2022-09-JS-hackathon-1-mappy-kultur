import { Marker, Popup } from "react-leaflet";
import { useState } from "react";
import PropTypes from "prop-types";
import { getdetails } from "../data/api";

export default function ComponentMarker({ marker }) {
  const [details, setDetails] = useState(null);
  const handleGetDetails = async (id) => {
    const result = await getdetails(id);
    setDetails(result);
  };

  return (
    <Marker
      xid={marker.xid}
      position={[marker.point.lat, marker.point.lon]}
      eventHandlers={{
        click: (e) => {
          handleGetDetails(e.target.options.xid);
        },
      }}
    >
      {!details ? (
        <Popup />
      ) : (
        <Popup>
          <h3>{details.name}</h3>
          {details.wikipedia_extracts && details.wikipedia_extracts.text}
          {details.preview && (
            <img
              src={details.preview.source}
              style={{ maxWidth: "40vw" }}
              alt=""
            />
          )}
        </Popup>
      )}
    </Marker>
  );
}

ComponentMarker.propTypes = {
  marker: PropTypes.func.isRequired,
}.isRequired;
