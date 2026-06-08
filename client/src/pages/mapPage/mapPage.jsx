import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* Click handler */
function MapClickHandler({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}

/* Main map page */
export default function MapPage() {
  const [hotspots, setHotspots] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [banner, setBanner] = useState(""); //
  const navigate = useNavigate();

  /* Load hotspots */
  const loadHotspots = () => {
    fetch("http://localhost:3001/api/hotspots")
      .then((res) => res.json())
      .then((data) => setHotspots(data))
      .catch((err) => console.error("Error loading hotspots:", err));
  };

  useEffect(() => {
    loadHotspots();
  }, []);

  /* mark as cleaned */
  const markCleaned = (id) => {
    fetch(`http://localhost:3001/api/hotspots/${id}/clean`, {
      method: "PUT",
    })
      .then(() => {
        loadHotspots();

        // show banner after marking clean
        setBanner("Clean up logged");

        setTimeout(() => {
          setBanner("");
        }, 2000);
      })
      .catch((err) => {
        console.error("Error updating hotspot:", err);

        setBanner("Failed to clean hotspot");

        setTimeout(() => {
          setBanner("");
        }, 2000);
      });
  };
  return (
    <>
      {/* clean logged banner */}
      {banner && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "black",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            zIndex: 999999,
          }}
        >
          {banner}
        </div>
      )}
      <header
        style={{
          padding: "16px",
          background: "#f5f5f5",
          borderBottom: "1px solid #dd",
        }}
      >
        <h1> Litter Hotspots </h1>
      </header>
      <MapContainer
        center={[51.75, -2.22]}
        zoom={13}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* Click map */}
        <MapClickHandler onSelect={setSelectedLocation} />

        {/* Createhotspot markers */}
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>
              <div style={{ minWidth: "160px", color: "black" }}>
                <p>Create hotspot here?</p>

                <button
                  onClick={() =>
                    navigate("/create-hotspot", {
                      state: selectedLocation,
                    })
                  }
                >
                  Create Hotspot
                </button>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Hotspots */}
        {hotspots
          .filter((spot) => spot.status !== "cleaned")
          .map((spot) => (
            <Marker
              key={spot.id}
              position={[Number(spot.lat), Number(spot.lng)]}
            >
              <Popup>
                <div style={{ color: "black", minWidth: "160px" }}>
                  <h3>{spot.username}</h3>
                  <p>{spot.address}</p>
                  <p>{spot.description}</p>
                  <p>Status: {spot.status}</p>

                  <button
                    onClick={() => markCleaned(spot.id)}
                    style={{
                      marginTop: "8px",
                      padding: "6px 10px",
                      border: "1px solid black",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    Mark as cleaned
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </>
  );
}

export default MapPage;


