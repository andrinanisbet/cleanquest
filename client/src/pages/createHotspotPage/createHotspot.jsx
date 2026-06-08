import { useLocation } from "react-router-dom";
import { useState } from "react";

function CreateHotspot() {
  const location = useLocation();
  const { lat, lng } = location.state || {
    lat: "Not Selected",
    lng: "Not Selected",
  };

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("active");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = { username, lat, lng, description, address, status };
    console.log("Form data:", formData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create New Hotspot</h2>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe this hotspot..."
            required
            rows="3"
          />
        </div>

        <div>
          <label>Address / Location Notes</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g., London Road ,Stroud"
            required
          />
        </div>

        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Clean">Cleaned</option>
            <option value="Not Clean">Not cleaned</option>
          </select>
        </div>

        <button type="submit">Create Hotspot</button>
      </form>
    </div>
  );
}

export default CreateHotspot;
