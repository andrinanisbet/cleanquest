import Header from "./Header/Header";
import StreakCard from "./StreakCard/streakcard";
import LeagueCard from "./LeagueCard/leaguecard";
import LeaderboardList from "./LeaderboardList/leaderboardList";
import styles from "./leaderboard.module.css";
import { useSelector } from "react-redux";


function Leaderboard() {
    const currentUser = useSelector((state) => state.auth.currentUser)

    return (
        <main className={styles.page}>
        <Header />
        {currentUser && ( <StreakCard />
        )}
        {currentUser && ( <LeagueCard />
        )}
        <LeaderboardList />
        </main>
    );
}

export default Leaderboard;
