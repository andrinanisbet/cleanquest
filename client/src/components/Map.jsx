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
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLocation } from "../store/locationSlice";
import { useLocation } from "react-router-dom";

/* ---------------- CLICK HANDLER ---------------- */
function MapClickHandler() {
  const dispatch = useDispatch();

  useMapEvents({
    click(e) {
      const coords = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      console.log("MAP CLICKED:", coords);

      dispatch(setSelectedLocation(coords));
    },
  });

  return null;
}

/* ---------------- MAIN MAP ---------------- */
export default function Map({ center }) {
  const [hotspots, setHotspots] = useState([]);
  const [banner, setBanner] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation,
  );

  /* LOAD HOTSPOTS */
  useEffect(() => {
    fetch("http://localhost:3001/api/hotspots")
      .then((res) => res.json())
      .then((data) => {
        console.log("HOTSPOTS FROM API:", data);
        setHotspots(data);
      });
  }, []);
  useEffect(() => {
    if (location.state?.banner) {
      setBanner(location.state.banner);

      setTimeout(() => {
        setBanner("");
      }, 2000);
    }
  }, []);

  /* MARK CLEANED */
  const markCleaned = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/hotspots/${id}/clean`,
        { method: "PUT" },
      );

      if (!res.ok) throw new Error("Request failed");

      await res.json();

      fetch("http://localhost:3001/api/hotspots")
        .then((res) => res.json())
        .then((data) => setHotspots(data));

      setBanner("Clean up logged");

      setTimeout(() => setBanner(""), 2000);
    } catch (err) {
      console.error(err);
      setBanner("Failed to clean hotspot");

      setTimeout(() => setBanner(""), 2000);
    }
  };

  return (
    <div>
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

        <MapClickHandler />

        {/* TEMP CLICK MARKER */}
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>
              <div style={{ color: "black" }}>
                <p>Use this location?</p>
                <button
                  onClick={() =>
                    navigate("/create-hotspot", {
                      state: selectedLocation,
                    })
                  }
                >
                  Create Hotspot Here
                </button>
              </div>
            </Popup>
          </Marker>
        )}

        {/* HOTSPOTS */}
        {hotspots
          .filter((spot) => spot.status !== "cleaned")
          .map((spot) => (
            <Marker
              key={spot.id}
              position={[Number(spot.lat), Number(spot.lng)]}
            >
              <Popup>
                <div style={{ color: "black" }}>
                  <h3>{spot.username}</h3>
                  <p>{spot.address}</p>
                  <p>{spot.description}</p>

                  <button onClick={() => markCleaned(spot.id)}>
                    Mark as cleaned
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      <div style={{ padding: "10px" }}>
        <h3>Active hotspots</h3>
        <ul>
          {hotspots
            .filter((spot) => spot.status !== "cleaned")
            .map((spot) => (
              <li key={spot.id}>{spot.address}</li>
            ))}
        </ul>
        <h3>Cleaned hotspots</h3>
        <ul>
          {hotspots
            .filter((spot) => spot.status === "cleaned")
            .map((spot) => (
              <li key={spot.id}>{spot.address}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}
