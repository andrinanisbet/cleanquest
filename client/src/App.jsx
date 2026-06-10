import MapPage from "./pages/mapPage/mapPage";
import Leaderboard from "./pages/leaderboardPage/leaderboard";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {


  return (
    <div>
      <Routes>
    <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
    </div>
  );
}

export default App;
