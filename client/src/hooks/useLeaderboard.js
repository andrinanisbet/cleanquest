import { useState, useEffect } from "react";

// Fetches leaderboard data on mount and shows loading/error state for user feedback
export default function useLeaderboard () {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLeaderboardData = async () => {
            try {
                const response = await fetch("http://localhost:3001/leaderboard", {
                method: "GET",
                });

                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`)
                }
                const data = await response.json();
                setLeaderboard(data);
            } catch (err) {
                setError(err.message);
            }

            // Runs after success or failure
            setLoading(false);   
        };

        getLeaderboardData();
    }, []);

    return {leaderboard, loading, error}
}

