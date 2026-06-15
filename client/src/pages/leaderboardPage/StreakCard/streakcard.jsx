import styles from "./streakcard.module.css";
import { useSelector } from "react-redux";


function StreakCard() {
     const currentUser = useSelector((state) => state.auth.currentUser)
    const streak = currentUser.streak;

    return (
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

export default StreakCard;