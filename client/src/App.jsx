import { Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import MapPage from "./pages/mapPage/mapPage";
import Home from "./pages/homePage/homePage";
import NavigationBar from "./components/NavigationBar/NavBar";
import CreateHotspot from "./pages/createHotspotPage/createHotspot";
import Leaderboard from "./pages/leaderboardPage/leaderboardPage";

function App() {
  return (
    <div>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/create-hotspot" element={<CreateHotspot />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
