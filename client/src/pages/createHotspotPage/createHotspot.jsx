import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateHotspot() {
  const navigate = useNavigate();

  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation,
  );

  const lat = selectedLocation?.lat;
  const lng = selectedLocation?.lng;

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("active");

  function handleSubmit(e) {
    e.preventDefault();

    if (!lat || !lng) {
      alert("No map location selected. Go back and click on the map.");
      return;
    }

    const formData = {
      username,
      lat,
      lng,
      description,
      address,
      status,
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
    <div style={{ padding: "20px" }}>
      <h2>Create Hotspot</h2>

      <p>
        Selected location: {lat}, {lng}
      </p>

      <form onSubmit={handleSubmit}>
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

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Not cleaned yet</option>
          <option value="cleaned">Cleaned</option>
        </select>

        <button type="submit">Create Hotspot</button>
      </form>
    </div>
  );
}
