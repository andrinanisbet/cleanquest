import { useSelector } from 'react-redux'
import styles from "./homepage.module.css";
import getUserLevel from "../../components/ProgressBar/Levels";

import useLeaderboard from "../../hooks/useLeaderboard";
import useHotspots from "../../hooks/useHotspots";
import WelcomeCard from "./components/WelcomeCard";
import EcoLevelCard from "./components/EcoLevelCard";
import CommunityImpactCard from "./components/CommunityImpactCard";
import LeaderboardPreview from "./components/LeaderboardPreview";

export default function Home() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const userPoints = currentUser?.points || 0;
    const { level, title, progress } = getUserLevel(userPoints);
    const { leaderboard } = useLeaderboard();
    const { hotspots } = useHotspots();

    const totalMembers = leaderboard.length;
    const hotspotsReported = hotspots.length;
    const totalCommunityPoints = leaderboard.reduce(
        (acc, user) => acc + user.points, 
        0)
    const topThreeLeaderboard = leaderboard.slice(0, 3)


    
    return (
         <div className ={styles.homePage}>
            <WelcomeCard username={currentUser?.username}/>
            <EcoLevelCard level={level} title={title} progress={progress} userPoints={userPoints} currentUser={currentUser}/>
            <LeaderboardPreview topThreeLeaderboard={topThreeLeaderboard}/>
            <CommunityImpactCard totalMembers={totalMembers} hotspotsReported={hotspotsReported} totalCommunityPoints={totalCommunityPoints}/>
         </div>

    )
   
}