// imports, useState to store data,useEffect to run when page loads, map
import { useEffect, useState } from "react";
import Map from "../../components/Map";

//the page that contains it all
function MapPage() {
  //hotspots state aka list of markers
  const [hotspots, setHotspots] = useState([]);
  // focus of map
  const [mapCenter, setMapCenter] = useState([53.48, -2.24]);

  async function handleSearch(location) {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${location}`,
    );

    const data = await res.json();

    if (data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);

      setMapCenter([lat, lng]);
    }
  }

  // load hotspots
  useEffect(() => {
    fetch("http://localhost:3001/api/hotspots")
      .then((res) => res.json())
      .then((data) => setHotspots(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // create hotspot on click
  function handleMapClick(e) {
    const { lat, lng } = e.latlng;

    fetch("http://localhost:3001/api/hotspots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: Number(lat),
        lng: Number(lng),
        description: "New hotspot",
        status: "uncleaned",
      }),
    })
      .then((res) => res.json())
      .then((newSpot) => {
        console.log("new hotspot:", newSpot);

        setHotspots((prev) => [...prev, newSpot]);
      })
      .catch((err) => console.error("POST error:", err));
  }
  // mark as cleaned function
  function markCleaned(id) {
    fetch(`http://localhost:3001/api/hotspots/${id}/clean`, {
      method: "PUT",
    })
      .then(() => {
        setHotspots((prev) =>
          prev.map((h) => (h.id === id ? { ...h, status: "cleaned" } : h)),
        );
      })
      .catch((err) => console.error("PUT error:", err));
  }

  return (
    <div>
      <h1>CleanQuest Map</h1>
      <br></br>
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
