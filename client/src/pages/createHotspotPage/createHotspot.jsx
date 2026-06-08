import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateHotspot() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get coordinates from map click
  const { lat, lng } = location.state || {};

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("active");

  /* Submit hotspot*/
  function handleSubmit(e) {
    e.preventDefault();

    console.log("Submitting hotspot...");

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

        // go back to map
        navigate("/");
      })
      .catch((err) => {
        console.error("Error creating hotspot:", err);
      });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Hotspot</h2>

      {/* Show location */}
      <p>
        Selected location: {lat}, {lng}
      </p>

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div style={{ marginBottom: "10px" }}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Address */}
        <div style={{ marginBottom: "10px" }}>
          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {/* Status*/}
        <div style={{ marginBottom: "10px" }}>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Not cleaned yet</option>
            <option value="cleaned">Cleaned</option>
          </select>
        </div>

        {/* Submit button*/}
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            border: "1px solid black",
            background: "white",
            cursor: "pointer",
          }}
        >
          Create Hotspot
        </button>
      </form>
    </div>
  );
}
