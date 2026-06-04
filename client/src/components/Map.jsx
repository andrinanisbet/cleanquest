import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";
import { useState } from "react";

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function App() {
  const [customMarkers, setCustomMarkers] = useState([]);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5847/5847891.png",
    iconSize: [38, 38],
  });

  const getAddress = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
    const data = await response.json();
    return data.display_name;
  };

  const handleMapClick = async (latlng) => {
    const address = await getAddress(latlng.lat, latlng.lng);

    const newMarker = {
      geocode: [latlng.lat, latlng.lng],
      address: address,
      popUp: "This spot needs a clean up!",
    };

    setCustomMarkers([...customMarkers, newMarker]);
  };

  return (
    <div>
      <MapContainer
        center={[51.7457, -2.2178]}
        zoom={13}
        style={{ height: "500px", width: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onMapClick={handleMapClick} />

        {customMarkers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <div style={{ marginTop: "20px" }}>
        <h3>Litter hotspots</h3>
        <ul>
          {customMarkers.map((pos, index) => (
            <li key={index}>
              <strong> {pos.address}</strong>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
