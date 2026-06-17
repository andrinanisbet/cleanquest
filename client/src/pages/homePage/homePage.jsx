import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import styles from "./homepage.module.css";
import getUserLevel from "../../components/ProgressBar/Levels";

export default function Home() {
    const currentUser = useSelector((state) => state.auth.currentUser);

    const userPoints = currentUser?.points || 0
    const { level, title, progress} = getUserLevel(userPoints);
    const [leaderboard, setLeaderboard] = useState([]);
    const [hotspots, setHotspots] = useState([]);

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

    const totalMembers = leaderboard.length;
    const hotSpotsReported = hotspots.length;
    const totalCommunityPoints = leaderboard.reduce(
        (acc, user) => acc + user.points, 
        0)
    const topThreeLeaderboard = leaderboard.slice(0, 3)
    
    return (
         <div className ={styles.homePage}>
            <div className ={styles.card}>
                <h1>Welcome back{currentUser ? `, ${currentUser.username}`: ""}!</h1>
                <p>Ready to make a difference today? Report litter, join an event, and earn points!</p>
            </div>
            <div className ={styles.card}>
                <h2>Eco Level</h2>
                <p>Level {level}: {title}</p>
                {currentUser && (
                <ProgressBar progressValue={progress}/>
                )}
                <p>{userPoints} points earned</p>

            </div>
            <div className = {styles.card}>
                <h2>Community Impact</h2>
                <div className ={styles.impactCard}>
                    <div className = {styles.impactStatCard}>
                        <h3>{totalMembers}</h3>
                        <p>Total Members</p>
                    </div>

                    <div className = {styles.impactStatCard}>
                        <h3>{hotSpotsReported}</h3>
                        <p>Hotspots reported</p>
                    </div>

                    <div className = {styles.impactStatCard}>
                        <h3>{totalCommunityPoints}</h3>
                        <p>Total community points earned</p>
                    </div>

            </div>
            
            </div>
            <div className ={styles.card}>
                <h2>My Saved Hotspots</h2>
                <p>No saved hotspots yet</p>


            </div>
            <div className ={styles.card}>
                <h2>Leaderboard Preview</h2>
                {topThreeLeaderboard.map((user, index) => (
                    <p key={user.user_id} className={styles.leaderboardUser}>
                        <span className={styles.medal}>
                            {index === 0 && "🥇"}
                            {index === 1 && "🥈"}
                            {index === 2 && "🥉"}
                        </span>

                        
                        {user.username} - {user.points} points
                    </p>
                ))}

            </div>

            
        </div>

    )
   
}