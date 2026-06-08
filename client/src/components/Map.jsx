import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* CLick handler */
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

/* Main map */
export default function Map({ center }) {
  const [hotspots, setHotspots] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [banner, setBanner] = useState("");

  const navigate = useNavigate();

  /* Load markers */
  const loadHotspots = () => {
    fetch("http://localhost:3001/api/hotspots")
      .then((res) => res.json())
      .then((data) => setHotspots(data));
  };

  useEffect(() => {
    loadHotspots();
  }, []);

  /* Mark as cleaned */
  const markCleaned = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/hotspots/${id}/clean`,
        { method: "PUT" },
      );

      if (!res.ok) throw new Error("Request failed");

      await res.json();

      loadHotspots();

      // Show banner
      setBanner("Clean up logged ");

      setTimeout(() => {
        setBanner("");
      }, 2000);
    } catch (err) {
      console.error(err);

      setBanner("Failed to clean hotspot");

      setTimeout(() => {
        setBanner("");
      }, 2000);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Banner*/}
      {banner && (
        <div
          style={{
            position: "fixed", // 👈 IMPORTANT CHANGE
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "black",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            zIndex: 999999,
            fontSize: "14px",
          }}
        >
          {banner}
        </div>
      )}
      <MapContainer
        center={center || [51.75, -2.22]}
        zoom={13}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* Click map*/}
        <MapClickHandler onSelect={setSelectedLocation} />

        {/* Create hotspot marker*/}
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

        {/* Hotspot*/}
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
    </div>
  );
}
