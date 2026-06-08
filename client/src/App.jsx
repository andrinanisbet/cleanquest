import "leaflet/dist/leaflet.css";

// import for navbar
import MapPage from "./pages/mapPage/mapPage";
import Home from "./pages/homePage/homePage";
import NavigationBar from "./components/NavigationBar/NavBar";
import CreateHotspot from "./pages/createHotspotPage/createHotspot";

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/create-hotspot" element={<CreateHotspot />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<MapPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

//<h1>{message}</h1>

export default App;
