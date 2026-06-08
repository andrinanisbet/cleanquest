import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MapClickHandler({ onSelect }) {
  useMapEvents({
    click(e) {
      console.log("map clicked");
      onSelect(e.latlng); // THIS is what stores it
    },
  });

  return null;
}

function Map({ hotspots = [], onMapClick, onClean, center }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <MapClickHandler onSelect={setSelectedLocation} />
      {selectedLocation && (
        <Marker position={selectedLocation}>
          <Popup>
            <div>
              <p>Create hotspot here?</p>
              <button
                onClick={() =>
                  navigate("/create-hotspot", {
                    state: selectedLocation,
                  })
                }
              >
                Continue
              </button>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
export default Map;
