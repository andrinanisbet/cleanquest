import MapPage from "./pages/mapPage/mapPage";
import Leaderboard from "./pages/leaderboardPage/leaderboard";
import { useEffect, useState } from "react";

// import main pages (home, map, leaderboard for navbar)
import {Routes, Route} from 'react-router-dom';
import Home from './pages/homePage/homePage';
import About from './pages/mapPage/mapPage';
import Counter from './pages/leaderboardPage/leaderboard';
import Navbar from './components/NavigationBar/NavBar';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/hello")
    .then((res) => res.json())
    .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
  return <MapPage />;
}

export default App;
