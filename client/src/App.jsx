import { Routes, Route } from "react-router-dom";
import MapPage from "./pages/mapPage/mapPage";
import CreateHotspot from "./pages/createHotspotPage/createHotspot";
import "leaflet/dist/leaflet.css";

// import for navbar
import {Routes, Route} from 'react-router-dom';
import Home from './pages/homePage/homePage';
import Map from './pages/mapPage/mapPage';
import NavigationBar from './components/NavigationBar/NavBar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MapPage />} />
      <Route path="/create-hotspot" element={<CreateHotspot />} />
    </Routes>
    <div>
      <NavigationBar/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/map" element={<Map/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
    </Routes>
      <h1>{message}</h1>
    </div>
    
  );
}

export default App;
