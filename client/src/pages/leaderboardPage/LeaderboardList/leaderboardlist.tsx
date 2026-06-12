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

    useEffect(() => {
        fetch("http://localhost:3001/leaderboard")
        .then((res) => res.json())
        .then((data: LeaderboardUser[]) => setUsers(data))
        .catch((err) => console.error(err));
    }, []);

    const sortedUsers = [...users].sort(
        (a, b) => b.points - a.points
    );

    return (
        <section className={styles.wrapper}>
            <h2>CleanQuest Leaderboard</h2>

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