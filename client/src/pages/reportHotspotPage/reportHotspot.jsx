import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ReportHotspot.css";

export default function ReportHotspot() {
  const navigate = useNavigate();

  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation,
  );

  const lat = selectedLocation?.lat;
  const lng = selectedLocation?.lng;

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!lat || !lng) {
      alert("No map location selected.");
      return;
    }

    const formData = {
      username,
      lat,
      lng,
      description,
      address,
      status: "active",
    };

    fetch("http://localhost:3001/api/hotspots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Hotspot created:", data);

        navigate("/map", {
          state: { banner: "Hotspot created successfully!" },
        });
      })
      .catch((err) => {
        console.error("Error creating hotspot:", err);
      });
  }

  return (
    <div className="create-hotspot-container"> 
      <h2>Report a litter hotspot</h2>

      <p>Help your community identify areas that need cleaning</p>

      <form
        onSubmit={handleSubmit}
        className="create-hotspot-form"
>
     
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Report Hotspot</button>
      </form>
    </div>
  );
}
