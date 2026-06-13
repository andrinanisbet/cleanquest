
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import usePersistAuth from "./hooks/usePersistAuth";

import LoginPage from "./pages/loginPage/loginPage";
import SignupPage from "./pages/signupPage/signupPage";
import "leaflet/dist/leaflet.css";

import MapPage from "./pages/mapPage/mapPage";
import Home from "./pages/homePage/homePage";
import NavigationBar from "./components/NavigationBar/NavBar";
import CreateHotspot from "./pages/createHotspotPage/createHotspot";
import Leaderboard from "./pages/leaderboardPage/leaderboard";
import ProfilePage from "./pages/profilePage/profilePage";

function App() {
  usePersistAuth();
  const currentUser = useSelector((state) => state.auth.currentUser)

  return (
    <div>
      <NavigationBar />

      <Routes>
        // Show Home for authenticated users, otherwise show Login
        <Route 
          path="/" 
          element={
            !currentUser
            ? <LoginPage />
            : <Home />
          }/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/create-hotspot" element={<CreateHotspot />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
