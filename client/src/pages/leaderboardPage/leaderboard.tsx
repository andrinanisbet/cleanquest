// Import the page header component
import Header from "./Header/Header";

// Import the card that displays the user's cleanup streak
import StreakCard from "./StreakCard/streakcard";

// Import the card that displays the user's level and progress
import LeagueCard from "./LeagueCard/leaguecard";

// Import the leaderboard list component
import LeaderboardList from "./LeaderboardList/leaderboardList";

// Import CSS module styles for the leaderboard page
import styles from "./leaderboard.module.css";

// Import useSelector so we can read data from the Redux store
import { useSelector } from "react-redux";

// Main leaderboard page component
function Leaderboard() {
    // Get the current logged-in user from Redux state
    const currentUser = useSelector((state) => state.auth.currentUser)

    return (
        // Main page container for the leaderboard page
        <main className={styles.page}>
        <Header />
        {currentUser && ( <StreakCard />
        )}
        {currentUser && ( <LeagueCard />
        )}
        <LeaderboardList />
        </main>
    );
}

// Export the leaderboard page so it can be used in the app routes
export default Leaderboard;
