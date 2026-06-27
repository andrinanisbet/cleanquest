import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./reportHotspot.css";

export default function ReportHotspot() {
  const navigate = useNavigate();

  /*  Retrieve the username and location selected on the map from the Redux store.
    Redux was chosen so the data can be shared between pages without needing to pass data through multiple components */

  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation,
  );

  const lat = selectedLocation?.lat;
  const lng = selectedLocation?.lng;

  const currentUser = useSelector((state) => state.auth.currentUser);

  const username =
    currentUser?.username || currentUser?.name || currentUser?.email || "";

  /* useState is used to manage form input values.
   This allows React to track user input and update the form dynamically */

  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [litterType, setLitterType] = useState("");
  const [severity, setSeverity] = useState("");
  const [photo, setPhoto] = useState(null);

  /* When the selected map location changes, useEffect automatically updates the 
   address field with the current coordinates. */

  useEffect(() => {
    if (lat && lng) {
      setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    }
  }, [lat, lng]);

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

    const data = new FormData();
    data.append("username", username);
    data.append("lat", lat);
    data.append("lng", lng);
    data.append("description", description);
    data.append("address", address);
    data.append("litterType", litterType);
    data.append("severity", severity);
    data.append("status", "active");

    if (photo) {
      data.append("image", photo);
    }

    /*  The Fetch API is used to send hotspot data to the backend,
    where it can be stored in the SQL database and displayed on the map */
    const token = localStorage.getItem("token");
    fetch("http://localhost:3001/api/hotspots", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Failed to create hotspot");
          });
        }
        return res.json();
      })
      .then((result) => {
        console.log("Hotspot created:", result);

        /*  After successful creation, the user is redirected back to the map
    so they can immediately view the newly reported hotspot */

        navigate("/map", {
          state: { banner: "Hotspot created successfully!" },
        });
      })
      .catch((err) => {
        console.error("Error creating hotspot:", err);
        alert("Unable to create hotspot. Please try again.");
      });
  }

  return (
    <div className="report-hotspot-container">
      <div className="report-hotspot-card">
        <h2>Report a litter hotspot</h2>

        <p>Help your community identify areas that need cleaning</p>

        <form onSubmit={handleSubmit} className="report-hotspot-form">
          <label htmlFor="username">Username</label>
          <input id="username" value={username} readOnly />

          <label htmlFor="description">Description of Hotspot</label>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            maxLength={200}
            required
          />

          <p className="character-count">{description.length}/200 characters</p>

          <label htmlFor="address">Location</label>
          <input
            id="address"
            placeholder="Selected location"
            value={address}
            maxLength={100}
            readOnly
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
            <option value="other">
              Other (provide details in description)
            </option>
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
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <button type="submit">Report Hotspot</button>
        </form>
      </div>
    </div>
  );
}
