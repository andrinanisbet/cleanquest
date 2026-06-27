// Import CSS module styles for this LeaderboardRow component
import styles from "./LeaderboardRow.module.css";

// Define the shape of a leaderboard user object
interface LeaderboardUser {
    user_id: number;
    username: string;
    points: number;
    streak: number;
}

// Define the props that the LeaderboardRow component expects
type LeaderboardRowProps = {
    rank: number;
    user: LeaderboardUser;
}

// Component that displays one user row in the leaderboard
function LeaderboardRow({ rank, user }: LeaderboardRowProps) {
    return (
        // Main container for a single leaderboard row
        <div className={styles.row}>
        <p className={styles.rank}>#{rank}</p>

        <div className={styles.avatar}>
            {user.username.charAt(0).toUpperCase()}
            </div>

            <p className={styles.name}>{user.username}</p>

            <div className={styles.stats}>
                <p className={styles.cleanups}>♻️ {user.streak} streak</p>
                <p className={styles.points}>⭐ {user.points} points</p>
            </div>
        </div>
    );
}

// Export the component so it can be used inside LeaderboardList
export default LeaderboardRow;
