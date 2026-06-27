import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

import getUserLevel from "../../components/ProgressBar/Levels";
import Button from "../../components/Button/Button";
import styles from "./profilePage.module.css";
import useLeaderboard from "../../hooks/useLeaderboard";
import useHotspots from "../../hooks/useHotspots";
import ProfileHeader from "./components/ProfileHeader";
import EcoProgressCard from "./components/EcoProgressCard";
import MyStatsCard from "./components/MyStatsCard";
import RecentHotspotsCard from "./components/RecentHotspotsCard";
import formatDate from "./formatDate"

export default function ProfilePage (){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.currentUser); 
    const {leaderboard, loading: leaderboardLoading} = useLeaderboard();
    const {hotspots, loading: hotspotsLoading} = useHotspots();

    const currentPoints = currentUser?.points || 0;
    const { level, title, progress, pointsToNextLevel } = getUserLevel(currentPoints);

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(clearCurrentUser());
        navigate("/");
    }

    // +1 converts 0-based index into a user friendly rank
    // findIndex can briefly return -1 before currentUser or leaderboard have loaded,
    // but the guard at the bottom of the file ensures this value is never rendered until both are ready
    const userRank = 
        leaderboard.findIndex(
            (user) => user.user_id === currentUser?.user_id
        )+1; 

    // filtering by username rather than user_id, as the hotspots table in the database
    // only stores username and has no foreign key relationship to users.user_id 
    const userHotspots = hotspots.filter(
        (hotspot) => hotspot.username === currentUser?.username
    );

    const hotspotsReported = userHotspots.length;
    const recentUserHotspots = userHotspots.slice(-3).reverse();

    // renders only once user, leaderboard, and hotspots have all loaded
    // this ensures userRank (and the other stats) are never displayed before they reflect complete, accurate data
    if(currentUser && !leaderboardLoading && !hotspotsLoading){
        return (
            <div className ={styles.profilePage}>

                <ProfileHeader username={currentUser.username} createdAt={formatDate(currentUser.created_at)}/>
                <EcoProgressCard progress={progress} level={level} title={title} currentPoints={currentPoints} pointsToNextLevel={pointsToNextLevel}/>
                <MyStatsCard userStreak={currentUser.streak} lastCleanupDate={formatDate(currentUser.last_cleanup_date)} userRank = {userRank} hotspotsReported = {hotspotsReported}/>
                <RecentHotspotsCard recentUserHotspots={recentUserHotspots}/>
 
                <Button className={styles.logoutButton} onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        );
    }

    return <p>Loading profile...</p>
}