import { Routes, Route } from "react-router-dom";

import MapPage from "./pages/mapPage/mapPage";
import CreateHotspot from "./pages/createHotspotPage/createHotspot";
import Home from "./pages/homePage/homePage";
import NavigationBar from "./components/NavigationBar/NavBar";

import "leaflet/dist/leaflet.css";

function App() {
  return (
    <div>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/create-hotspot" element={<CreateHotspot />} />
      </Routes>
    </div>
  );
}

export default App;
