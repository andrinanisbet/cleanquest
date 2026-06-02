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
      popUp: "This spot needs a clean up!",
    };

    setCustomMarkers([...customMarkers, newMarker]);
  };

  return (
    // The map component
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
      // Litter hotspot list
      <div style={{ marginTop: "20px" }}>
        <h3>Litter hotspots</h3>
        <ol>
          {customMarkers.map((marker, index) => (
            <li key={index}>
              Latitude: {marker.geocode[0].toFixed(4)}, Longitude:{" "}
              {marker.geocode[1].toFixed(4)}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
