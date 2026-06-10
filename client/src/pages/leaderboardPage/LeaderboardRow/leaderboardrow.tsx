import styles from "./LeaderboardRow.module.css";

type LeaderboardRowProps = {
    rank: number;
    name: string;
    points: number;
};

function LeaderboardRow({ rank, name, points }: LeaderboardRowProps) {
    return (
        <div className={styles.leaderboardRow}>
            <span>{rank}</span>
            <span>{name}</span>
            <span>{points} points</span>
        </div>
    );
}

export default LeaderboardRow;
