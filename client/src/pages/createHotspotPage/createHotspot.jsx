import { useLocation } from "react-router-dom";
import { useState } from "react";

function CreateHotspot() {
  const location = useLocation();

  const { lat, lng } = location.state || {};

  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log({ lat, lng, description });

    // later: POST to backend here
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Hotspot</h2>

      <p>Lat: {lat}</p>
      <p>Lng: {lng}</p>

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <button type="submit">Create</button>
    </form>
  );
}

export default CreateHotspot;
