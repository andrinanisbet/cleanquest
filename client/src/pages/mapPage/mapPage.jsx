import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Map from "../../components/Map";

function MapPage() {
  const [hotspots, setHotspots] = useState([]);
  const [mapCenter] = useState([51.7457, -2.2178]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/hotspots")
      .then((res) => res.json())
      .then((data) => setHotspots(data));
  }, []);

  function handleMapClick(e) {
    const { lat, lng } = e.latlng;

    navigate("/create-hotspot", {
      state: { lat, lng },
    });
  }

  function markCleaned(id) {
    fetch(`http://localhost:3001/api/hotspots/${id}/clean`, {
      method: "PUT",
    }).then(() => {
      setHotspots((prev) =>
        prev.map((h) => (h.id === id ? { ...h, status: "cleaned" } : h)),
      );
    });
  }

  return (
    <div>
      <h1>CleanQuest Map</h1>

      <Map
        hotspots={hotspots}
        onMapClick={handleMapClick}
        onClean={markCleaned}
        center={mapCenter}
      />
    </div>
  );
}

export default MapPage;
