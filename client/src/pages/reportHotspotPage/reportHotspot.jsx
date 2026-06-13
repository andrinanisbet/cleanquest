import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./reportHotspot.css";

export default function ReportHotspot() {
  const navigate = useNavigate();

/*  Retrieve the location selected on the map from the Redux store.
    Redux was chosen so the selected coordinates can be shared between the map page 
    and the hotspot reporting page without needing to pass data through multiple components */

  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation,
  );

  const lat = selectedLocation?.lat;
  const lng = selectedLocation?.lng;

/* useState is used to manage form input values.
   This allows React to track user input and update the form dynamically */

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [litterType, setLitterType] = useState("");
  const [severity, setSeverity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

/*  Validation is performed before submission to ensure
    a hotspot cannot be created without a location selected on the map.*/
    if (!lat || !lng) {
      alert("No map location selected.");
      return;
    }

/*  Form data is collected into a single object before being sent to the backend API. 
    This makes it easier to send the hotspot information as JSON */

    const formData = {
      username,
      lat,
      lng,
      description,
      address,
      litterType,
      severity,
      status: "active",
    };

/*  The Fetch API is used to send hotspot data to the backend,
    where it can be stored in the SQL database and displayed on the map */

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


/*  After successful creation, the user is redirected back to the map
    so they can immediately view the newly reported hotspot */

        navigate("/map", {
          state: { banner: "Hotspot created successfully!" },
        });
      })
      .catch((err) => {
        console.error("Error creating hotspot:", err);
      });
  }

  return (
    <div className="report-hotspot-container"> 
      <h2>Report a litter hotspot</h2>

      <p>Help your community identify areas that need cleaning</p>

      <form
        onSubmit={handleSubmit}
        className="report-hotspot-form"
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

        <label htmlFor="litterType">Type of litter</label>
          <select
            id="litterType"
            value={litterType}
            onChange={(e) => setLitterType(e.target.value)}
            required
          >
            <option value="">Select litter type</option>
            <option value="general">General litter</option>
            <option value="plastic">Plastic</option>
            <option value="glass">Glass</option>
            <option value="fly-tipping">Fly-tipping</option>
            <option value="overflowing-bin">Overflowing bin</option>
            <option value="other">Other (provide details in description)</option>
          </select>

        <fieldset>
        <legend>Severity</legend>

         <div className="severity-options">
          <label>
            <input
            type="radio"
            name="severity"
            value="low"
            checked={severity === "low"}
            onChange={(e) => setSeverity(e.target.value)}
            required
            />
            Low
          </label>

          <label>
            <input
            type="radio"
            name="severity"
            value="medium"
            checked={severity === "medium"}
            onChange={(e) => setSeverity(e.target.value)}
            />
            Medium
          </label>

          <label>
            <input 
            type="radio"
            name="severity"
            value="high"
            checked={severity === "high"}
            onChange={(e) => setSeverity(e.target.value)}
            />
            High
          </label>
         </div>
        </fieldset>

        <label htmlFor="photo">Upload photo (optional)</label>
          
          <input
            id="photo"
            type="file"
            accept="image/*"
          />

        <button type="submit">Report Hotspot</button>
      </form>
    </div>
  );
}
