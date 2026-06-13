import LeaderboardRow from "../LeaderboardRow/LeaderboardRow";
import styles from "./LeaderboardList.module.css";
import { useState, useEffect } from "react";

interface LeaderboardUser {
    user_id: number;
    username: string;
    points: number;
    streak: number;
}

function LeaderboardList() {
    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/leaderboard")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch leaderboard");
            }

            return res.json();
        })
        .then((data: LeaderboardUser[]) => {
            setUsers(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setError("Could not load leaderboard");
            setLoading(false);
        });
    }, []);

    const sortedUsers = [...users].sort(
        (a, b) => b.points - a.points
    );

    if (loading) {
        return <p>Loading leaderboard...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>CleanQuest Leaderboard</h2>

        <div className={styles.leaderboardList}>
            {sortedUsers.map((user, index) => (
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

export default LeaderboardList; 