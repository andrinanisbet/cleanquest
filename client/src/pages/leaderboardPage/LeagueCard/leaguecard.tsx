import styles from "./leaguecard.module.css";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { useSelector } from "react-redux";
import getUserLevel from "../../../components/ProgressBar/Levels";

function LeagueCard() {
    const currentUser = useSelector((state) => state.auth.currentUser)

    const userPoints = currentUser?.points || 0;
    const { level, title, progress } = getUserLevel(userPoints);
    const pointsNeeded = 100;

    // const progressPercent = (currentPoints / pointsNeeded) * 100;
    const remainingPoints = pointsNeeded - progress;

    return (
        <section className={styles.card}>
            <div className={styles.textRow}>
                <p> Level: {level} {title}</p>

                <div>
                    {currentUser && (
                    <ProgressBar progressValue={progress}/>
                    )}
                    <p>Earn {remainingPoints} more points to level up</p>
                </div>
            </div>

        </section>
    );
}

export default LeagueCard;