import LeaderboardRow from "../LeaderboardRow/LeaderboardRow";
import styles from "./LeaderboardList.module.css";
import { useState, useEffect } from "react";

type User = {
    user_id: number;
    username: string;
    points: number;
    streak: number;
};

function LeaderboardList() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch("http://localhost:3001/leaderboard")
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error(err));
    }, []);

    const sortedUsers = [...users].sort(
        (a, b) => b.points - a.points
    );

    return (
        <div className={styles.leaderboardList}>
            {sortedUsers.map((user, index) => (
                <LeaderboardRow
                    key={user.user_id}
                    rank={index + 1}
                    name={user.username}
                    points={user.points}
                    />
            ))}
        </div>
    );
}

export default LeaderboardList; 