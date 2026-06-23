
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import usePersistAuth from "./hooks/usePersistAuth";

import LoginPage from "./pages/loginPage/loginPage";
import SignupPage from "./pages/signupPage/signupPage";
import "leaflet/dist/leaflet.css";

import MapPage from "./pages/mapPage/mapPage";
import Home from "./pages/homePage/homePage";
import NavigationBar from "./components/NavigationBar/NavBar";
import ReportHotspot from "./pages/reportHotspotPage/reportHotspot";
import Leaderboard from "./pages/leaderboardPage/leaderboard";
import ProfilePage from "./pages/profilePage/profilePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  usePersistAuth();

  return (
    <div>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
        <Route path="/report-hotspot" element={<ProtectedRoute><ReportHotspot /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
