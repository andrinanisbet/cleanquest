//import all the tools needed
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

// helper to listen for clicks
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng); // send coodinates to app
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

  const handleMapClick = (latlng) => {
    const newMarker = {
      geocode: [latlng.lat, latlng.lng],
      popUp: "The spot needs a clean up!",
    };

    setCustomMarkers([...customMarkers, newMarker]);
  };

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
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
  );
}
