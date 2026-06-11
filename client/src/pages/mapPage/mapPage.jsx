import { useState, useEffect } from "react";
import Map from "../../components/Map";
import style from "./mapPage.module.css";

export default function MapPage() {

      {/*STORE HOTSPOTS*/}
      const [hotspots, setHotspots] = useState([]);

      {/*FETCH HOTSPOTS*/}
      useEffect(() => {
        fetch(" YOUR_API_URL/hotspots") // replace with my api later
        .then(response => response.json())
        .then(data => setHotspots(data))
        .catch (error => console.log (error))

    }, []);

    return (
      <div className={style.mapPage}>

      {/*HEADER*/}
      <header className={style.mapHeader}>
      <h1>Litter Hotspots</h1>

      {/* INSTRUCTIONAL TEXT */}
      <div className ={style.instructions}>
       <h2> How to create a hotspot</h2>
       <ol>
        <li>Click anwhere on the map</li>
        <li> Fill out the form with details about the hotspot</li>
          <li>Submit the form to create the hotspot</li>
          <li>It will appear on the map and list below</li>
       </ol>
       </div>

      <p>
         You can report a hotspot, or view existing hot spots.

         </p>
      </header>

      {/*MAP*/}
      <Map center={[51.75, -2.22]} />

      {/* LIST OF HOTSPOTS */}
      <div className={style.hotspotsList}>
        <h3>Hotspots List</h3>
        <p> Here you can find a list of all the hotspots that have been created.</p>
      
      {/*EMPTY STATE*/}
      {hotspots.length === 0 ? (
      <p>No litter hotspots reported yet.</p>  
      ) : (
     hotspots.map((h) => (
        <div key={h.id} className={style.hotspotItem}>
          <h4>{h.name}</h4>
          <p>{h.description}</p>
          <p>Status: {h.status}</p>
        </div>
      ))
      )}
      
      </div>

    </div>

  );
}
