// Import CSS module styles for the LeagueCard component
import styles from "./leaguecard.module.css";

// Import the ProgressBar component to show the user's level progress
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

// Import Redux hooks to read from and update the global store
import { useSelector, useDispatch } from "react-redux";

// Import useEffect to run code when the component loads
import { useEffect } from "react";

// Import helper function that calculates the user's level details
import getUserLevel from "../../../components/ProgressBar/Levels";

// Import Redux action to update the current user in the auth state
import { setCurrentUser } from "../../../store/authSlice";

// Component that displays the user's current league level and progress
function LeagueCard() {
    // Create dispatch function so we can update Redux state
    const dispatch = useDispatch();
    // Get the current logged-in user from Redux state
    const currentUser = useSelector((state) => state.auth.currentUser);

    // Refresh the current user's data when this component first loads
    useEffect(() => {
        // Async function to get the latest user data from the backend
        const refreshCurrentUser = async () => {
            // Get the saved login token from local storage
            const token = localStorage.getItem("token");

            // Stop if there is no token, because the user is not logged in
            if(!token) return;

            // Request the current user's details from the backend
            const res = await fetch("http://localhost:3001/api/auth/me", {
                headers: {
                    // Send the token so the backend knows which user is logged in
                    Authorization: `Bearer ${token}`,
                },
            });

            // Stop if the request was not successful
            if (!res.ok) return;

            // Convert the response into JSON data
            const data = await res.json();

            // Save the updated user data into Redux state
            dispatch(setCurrentUser(data.user));
        };

        // Call the function to refresh the current user
        refreshCurrentUser();
    }, [dispatch]);

    // Use the current user's points, or 0 if no user is loaded yet
    const currentPoints = currentUser?.points || 0;

    // Calculate the user's level, title, progress, and points needed to level up
    const { level, title, nextLevelNumber, nextTitle, progress, pointsToNextLevel } = 
        getUserLevel(currentPoints);

    return (
        // Main card section for the user's league progress
        <section className={styles.card}>
            <div className={styles.levelRow}>
                <p> 
                    Level {level}: {title}    
                </p>

                <p className={styles.nextLevel}>
                    Next Level {nextLevelNumber}: {nextTitle}
                </p>
</div>
                    <ProgressBar progressValue={progress} />
                    
                    <p className={styles.pointsText}>
                        Earn {pointsToNextLevel} more points to level up
                        </p>
        </section>
    );
}

// Export the component so it can be used in other files
export default LeagueCard;