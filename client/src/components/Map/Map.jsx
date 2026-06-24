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
import { setSelectedLocation } from "../../store/locationSlice";
import { setCurrentUser } from "../../store/authSlice";
import { useLocation } from "react-router-dom";

/* Click Handler */
function MapClickHandler() {
  const dispatch = useDispatch();

  useMapEvents({
    click(e) {
      const coords = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };
      dispatch(setSelectedLocation(coords));
    },
  });
  return null;
}

/* Main app */
export default function Map({ center }) {
  const [hotspots, setHotspots] = useState([]);
  const [banner, setBanner] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation,
  );

  /* Load hotspots */
  useEffect(() => {
    fetch("http://localhost:3001/api/hotspots")
      .then((res) => res.json())
      .then((data) => {
        console.log("Hotspots loaded:", data);
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
  }, [location.state]);

  /* Mark cleaned */
  const refreshCurrentUser = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3001/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to refresh current user");
    }

    const data = await res.json();

    console.log("Refreshed user after cleanup:", data.user);

    dispatch(setCurrentUser(data.user));
  };

  const markCleaned = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3001/api/hotspots/${id}/clean`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error("Request failed");

      await res.json();

      await refreshCurrentUser();

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
            background: "green",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            zIndex: 999999,
            fontSize: "18px",
          }}
        >
          {banner}
        </div>
      )}

      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <MapClickHandler />
        {/* Temporary click marker */}
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>
              <div style={{ color: "black" }}>
                <p>Use this location?</p>
                <button
                  onClick={() =>
                    navigate("/report-hotspot", {
                      state: selectedLocation,
                    })
                  }
                >
                  Report Hotspot Here
                </button>
              </div>
            </Popup>
          </Marker>
        )}
        {/* Hotspots*/}
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
                  <p>Type: {spot.liiter_type}</p>
                  <p>Severity: {spot.severity}</p>

                  <button onClick={() => markCleaned(spot.id)}>
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
