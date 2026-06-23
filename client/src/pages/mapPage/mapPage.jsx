import { useState, useEffect } from "react";
import Map from "../../components/Map/Map";
import style from "./mapPage.module.css";

export default function MapPage() {
  const [hotspots, setHotspots] = useState([]);

  const fetchHotspots = () => {
    fetch("http://localhost:3001/api/hotspots")
      .then((res) => res.json())
      .then((data) => setHotspots(data));
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

      if (!res.ok) {
        throw new Error("Failed to mark hotspot as cleaned");
      }

      await res.json();

      fetchHotspots();
    } catch (err) {
      console.error("Failed to mark cleaned:", err);
    }
  };

  useEffect(() => {
    fetchHotspots();
  }, []);

  return (
    <div className={style.mapPage}>
      {/*HEADER*/}
      <header className={style.mapHeader}>
        <h1>🌱 Report a Litter Hotspot</h1>

        {/* INSTRUCTIONAL TEXT */}
        <div className={style.instructions}>
          <h2> How to report a litter hotspot</h2>
          <ol>
            <li> 📍 Click anywhere on the map to choose a location</li>
            <li> 📝 Fill out the form with details about the hotspot</li>
            <li> ✅Submit the form to report the hotspot</li>
            <li>🗺️It will appear on the map and list below</li>
          </ol>
        </div>

        <p>You can report a hotspot, or view existing hot spots.</p>
      </header>

      {/*MAP*/}
      <Map center={[51.75, -2.22]} />

      {/* LIST OF HOTSPOTS */}
      <div className={style.hotspotsList}>
        <h3>Hotspots List</h3>
        <p>
          Here you can find a list of all the hotspots that have been reported.
        </p>
        {hotspots.length === 0 ? (
          <p>No litter hotspots reported yet.</p>
        ) : (
          hotspots
            .filter((h) => h.status !== "cleaned")
            .map((h) => (
              <div key={h.id} className={style.hotspotItem}>
                {h.image && (
                  <img
                    className={style.hotspotImage}
                    src={`http://localhost:3001/${h.image}`}
                    alt="Litter hotspot"
                  />
                )}
                <p className={style.username}>Reported by: {h.username}</p>
                <p>{h.description}</p>
                <span className={style.status}>{h.status}</span>
                <button onClick={() => markCleaned(h.id)}>
                  Mark as cleaned
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
