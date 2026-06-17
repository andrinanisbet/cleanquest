import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import getUserLevel from "../../components/ProgressBar/Levels";
import Button from "../../components/Button/Button";
import styles from "./profilePage.module.css";


export default function ProfilePage (){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.currentUser); 
    const [leaderboard, setLeaderboard] = useState([]);
    const [hotspots, setHotspots] = useState([]);


    const currentPoints = currentUser?.points || 0;
    const { level, title, progress, pointsToNextLevel } = getUserLevel(currentPoints);

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(clearCurrentUser());
        navigate("/");
    }

    useEffect(() => {
        const getLeaderboardData = async () => {
            const response = await fetch("http://localhost:3001/leaderboard", {
                method: "GET",
            });

            const data = await response.json();

            setLeaderboard(data);
        };

        getLeaderboardData();
    }, []); 
    
    useEffect(() => {
        const getHotspotsData = async () => {
            const response = await fetch("http://localhost:3001/api/hotspots", {
                method: "GET",
            });

            const data = await response.json();

            setHotspots(data);
        };

        getHotspotsData();
    }, []);

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

                <div className={styles.profileCard}>
                    <h1>Profile</h1>
                    <h2>{currentUser.username}</h2>
                    <p>Member since: {currentUser.created_at}</p>
                    <p>Ready to make a difference today? Report litter, clean-up a litter hotspot, and earn points!</p>
                </div>

                <div className={styles.profileCard}>
                    <h2>Eco Progress</h2>
                    <ProgressBar progressValue={progress} />
                    <p>Level {level}: {title}</p>
                    <p>Points: {currentPoints}</p>
                    <p>Points to next level: {pointsToNextLevel}</p>
                    
                </div>

                <div className={styles.profileCard}>
                    <h2>My Stats</h2>
                    <p>Streak: {currentUser.streak}</p>
                    <p>Last Cleanup Date: {currentUser.last_cleanup_date}</p>
                    <p>Rank: {userRank > 0 ? `#${userRank}` : "Loading..."}</p>
                    <p>Hotspots reported: {hotspotsReported}</p>
                </div>

                <div className={styles.hotspotProfileCard}>
                    <h2>Recently Reported Hotspots</h2>

                    {recentUserHotspots.length > 0 ? (
                        <div className={styles.hotspotList}>
                            {recentUserHotspots.map((hotspot) => (
                                <div key={hotspot.id} className={styles.hotspotCard}>
                                    Description: {hotspot.description}
                                    <br />
                                    Address: {hotspot.address}
                                </div>
                        ))}
                        </div>
                    ) : (
                        <p>No hotspots reported yet</p>
                    )}   
                </div>



                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        );
    }

    return <p>Loading profile...</p>
}