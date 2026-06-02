import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(event) {
      onMapClick(event.latlng);
    },
  });

  return null;
}

function Map() {
  const [markerPosition, setMarkerPosition] = useState(null);

  return (
    <MapContainer
      center={[53.4808, -2.2426]}
      zoom={13}
      style={{
        height: "80vh",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler
        onMapClick={(position) => {
          console.log(position);
          setMarkerPosition(position);
        }}
      />

      {markerPosition && <Marker position={markerPosition} />}
    </MapContainer>
  );
}

export default Map;
