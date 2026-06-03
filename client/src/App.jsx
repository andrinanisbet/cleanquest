import MapPage from "./pages/mapPage/mapPage";
import Leaderboard from "./pages/leaderboardPage/leaderboard";
import { useEffect, useState } from "react";

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
