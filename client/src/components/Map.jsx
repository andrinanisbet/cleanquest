import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e);
    },
  });

  return null;
}

function Map({ hotspots = [], onMapClick, onClean, center }) {
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <MapClickHandler onMapClick={onMapClick} />

      {hotspots.map((spot) => (
        <Marker key={spot.id} position={[spot.lat, spot.lng]}>
          <Popup>
            <div>
              <h3>{spot.address || spot.description}</h3>
              <p>{spot.status}</p>

              {spot.status !== "cleaned" && (
                <button onClick={() => onClean(spot.id)}>
                  Mark as cleaned
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
