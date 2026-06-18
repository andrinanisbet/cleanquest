import Card from "../../../components/Card/Card";
import styles from "../homepage.module.css";

export default function LeaderboardPreview ({topThreeLeaderboard}) {
    return (
        <Card>
            <h2>Leaderboard Preview</h2>
            {topThreeLeaderboard.map((user, index) => (
                <p key={user.user_id} className={styles.leaderboardUser}>
                    <span className={styles.medal}>
                        {index === 0 && "🥇"}
                        {index === 1 && "🥈"}
                        {index === 2 && "🥉"}
                    </span>

                    {user.username} - {user.points} points
                </p>
            ))}

        </Card>
    )
}



