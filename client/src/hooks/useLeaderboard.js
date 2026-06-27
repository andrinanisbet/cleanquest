import { useState, useEffect } from "react";

export default function useLeaderboard () {
    const [leaderboard, setLeaderboard] = useState([]);
    // loading and error are exposed so Home and ProfilePage can show feedback during the fetch
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //not extracted to its own file as with getHotspotsData, this was to allow testing for getHotspotsData
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

            // Runs after success or failure, so loading is always set to false after fetch is complete
            setLoading(false);   
        };

        getLeaderboardData();
    }, []);

    return {leaderboard, loading, error}
}

