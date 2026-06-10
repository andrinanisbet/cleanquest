
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";
import SignupPage from "./pages/signupPage/signupPage";
import "leaflet/dist/leaflet.css";

import MapPage from "./pages/mapPage/mapPage";
import Home from "./pages/homePage/homePage";
import NavigationBar from "./components/NavigationBar/NavBar";
import CreateHotspot from "./pages/createHotspotPage/createHotspot";
import Leaderboard from "./pages/leaderboardPage/leaderboard";

function App() {
  return (
    <div>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/create-hotspot" element={<CreateHotspot />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
