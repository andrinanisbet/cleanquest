import styles from "./leaguecard.module.css";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import getUserLevel from "../../../components/ProgressBar/Levels";
import { setCurrentUser } from "../../../store/authSlice";

function LeagueCard() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);

    useEffect(() => {
        const refreshCurrentUser = async () => {
            const token = localStorage.getItem("token");


            if(!token) return;

            const res = await fetch("http://localhost:3001/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) return;

            const data = await res.json();

            dispatch(setCurrentUser(data.user));
        };

        refreshCurrentUser();
    }, [dispatch]);

    const currentPoints = currentUser?.points || 0;

    const { level, title, nextLevelNumber, nextTitle, progress, pointsToNextLevel } = 
        getUserLevel(currentPoints);

    return (
        <section className={styles.card}>
            <div className={styles.levelRow}>
                <p> 
                    Level {level}: {title}    
                </p>

                <p className={styles.nextLevel}>
                    Next Level {nextLevelNumber}: {nextTitle}
                </p>
</div>
                    <ProgressBar progressValue={progress} />
                    
                    <p className={styles.pointsText}>
                        Earn {pointsToNextLevel} more points to level up
                        </p>
        </section>
    );
}

export default LeagueCard;