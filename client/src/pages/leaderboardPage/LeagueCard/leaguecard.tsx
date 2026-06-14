import styles from "./leaguecard.module.css";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { useSelector } from "react-redux";



function LeagueCard() {
    const currentUser = useSelector((state) => state.auth.currentUser)
    const currentLeague = "Silver";
    const nextLeague = "Gold";
    const currentPoints = 900;
    const pointsNeeded = 1000;

    const progressPercent = (currentPoints / pointsNeeded) * 100;
    const remainingPoints = pointsNeeded - currentPoints;

    return (
        <section className={styles.card}>
            <div className={styles.textRow}>
                <p>Current League: {currentLeague}</p>
                <div>
                    <p>Next League: {nextLeague}</p>
                    {currentUser && (
                    <ProgressBar progressValue={currentUser.points}/>
                    )}
                    <p>Earn {remainingPoints} more points to level up</p>
                </div>
            </div>

        </section>
    );
}

export default LeagueCard;