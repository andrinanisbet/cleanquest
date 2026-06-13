import Header from "./Header/Header";
import StreakCard from "./StreakCard/streakcard";
import LeagueCard from "./LeagueCard/leaguecard";
import LeaderboardList from "./LeaderboardList/leaderboardList";
import styles from "./leaderboard.module.css";
import ProgressBar from "../../components/ProgressBar/ProgressBar";


function Leaderboard() {
    return (
        <main className={styles.page}>
        <Header />
        <StreakCard />
        <LeagueCard />
        <ProgressBar progressValue={50} />
        <LeaderboardList />
        </main>
    );
}

export default Leaderboard;
