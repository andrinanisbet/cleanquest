import { Routes, Route } from "react-router-dom";
import MapPage from "./pages/mapPage/mapPage";
import CreateHotspot from "./pages/createHotspotPage/createHotspot";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MapPage />} />
      <Route path="/create-hotspot" element={<CreateHotspot />} />
    </Routes>
  );
}

export default App;
