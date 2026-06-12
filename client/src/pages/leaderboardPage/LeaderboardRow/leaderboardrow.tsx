import styles from "./LeaderboardRow.module.css";

interface LeaderboardUser {
    user_id: number;
    username: string;
    points: number;
    streak: number;
}

type LeaderboardRowProps = {
    rank: number;
    user: LeaderboardUser;
}

function LeaderboardRow({ rank, user }: LeaderboardRowProps) {
    return (
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

export default LeaderboardRow;
