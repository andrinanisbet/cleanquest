// Import the LeaderboardRow component to display each user in the leaderboard
import LeaderboardRow from "../LeaderboardRow/LeaderboardRow";

// Import CSS module styles for this component
import styles from "./LeaderboardList.module.css";

// Import React hooks for managing state and loading data
import { useState, useEffect } from "react";

// Define the shape of each leaderboard user object
interface LeaderboardUser {
    user_id: number;
    username: string;
    points: number;
    streak: number;
}

// Main component that fetches and displays the leaderboard
function LeaderboardList() {
    // Store the list of users from the leaderboard API
    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    
    // Track whether the leaderboard data is still loading
    const [loading, setLoading] = useState(true);
   
    // Store an error message if the leaderboard fails to load
    const [error, setError] = useState("");

    // Fetch leaderboard data when the component first loads
    useEffect(() => {
        fetch("http://localhost:3001/leaderboard")
        .then((res) => {
            // Check if the response from the server was unsuccessful
            if (!res.ok) {
                throw new Error("Failed to fetch leaderboard");
            }
            
            // Convert the response into JSON data
            return res.json();
        })
        .then((data: LeaderboardUser[]) => {
            // Save the leaderboard users into state
            setUsers(data);
            // Stop showing the loading message
            setLoading(false);
        })
        .catch((err) => {
            // Log the real error in the browser console for debugging
            console.error(err);

            // Show a user-friendly error message on the page
            setError("Could not load leaderboard");

            // Stop showing the loading message
            setLoading(false);
        });
    }, []);

    // Sort users by points from highest to lowest
    const sortedUsers = [...users].sort(
        (a, b) => b.points - a.points
    );

    // Show a loading message while data is being fetched
    if (loading) {
        return <p>Loading leaderboard...</p>;
    }

    // Show an error message if the request failed
    if (error) {
        return <p>{error}</p>;
    }

    return (
        // Main leaderboard section
        <section className={styles.wrapper}>
            <h2 className={styles.title}>CleanQuest Leaderboard</h2>

        <div className={styles.leaderboardList}>
            {sortedUsers.map((user, index) => (
                // Render one row for each user in the sorted leaderboard
                <LeaderboardRow
                    key={user.user_id}
                    rank={index + 1}
                   user={user}
                    />
            ))}
        </div>
        </section>
    );
}

// Export the component so it can be used in other parts of the app
export default LeaderboardList; 