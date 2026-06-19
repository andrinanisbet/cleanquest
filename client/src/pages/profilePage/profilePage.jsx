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
    const {leaderboard} = useLeaderboard();
    const {hotspots} = useHotspots();


    const currentPoints = currentUser?.points || 0;
    const { level, title, progress, pointsToNextLevel } = getUserLevel(currentPoints);

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(clearCurrentUser());
        navigate("/");
    }


    const userRank = 
        leaderboard.findIndex(
            (user) => user.user_id === currentUser?.user_id
        )+1; 

    const userHotspots = hotspots.filter(
        (hotspot) => hotspot.username === currentUser?.username
    );

    const hotspotsReported = userHotspots.length;
    const recentUserHotspots = userHotspots.slice(-3).reverse();
 
    if(currentUser){
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