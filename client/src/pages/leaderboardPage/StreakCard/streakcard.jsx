// Import CSS module styles for the StreakCard component
import styles from "./streakcard.module.css";

// Import useSelector so we can read data from the Redux store
import { useSelector } from "react-redux";

// Component that displays the user's current cleanup streak
function StreakCard() {
    // Get the current logged-in user from Redux state
    const currentUser = useSelector((state) => state.auth.currentUser)
    
    // Get the user's streak value
    const streak = currentUser.streak;

    return (
        // Main card section for the user's cleanup streak
        <section className={styles.card}>
            <div className={styles.topLine}>
                <span className={styles.fire}>🔥</span>
                <span className={styles.number}>{streak}</span>
            </div>
            
            <p className={styles.label}>CleanUp Streak</p>
            <p className={styles.motivation}>Keep going - every cleanup counts!</p>
        </section>
    );
}

// Export the component so it can be used in other files 
export default StreakCard;