import styles from "./streakcard.module.css";

function StreakCard() {
    const streak = 12;

    return (
        <section className={styles.card}>
            <div className={styles.topLine}>
                <span className={styles.fire}>🔥</span>
                <span className={styles.number}>{streak}</span>
            </div>
            
            <p className={styles.label}>Day Streak</p>
            <p className={styles.motivation}>Keep going - every cleanup counts!</p>
        </section>
    );
}

export default StreakCard;