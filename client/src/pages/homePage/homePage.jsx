import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from "../../store/authSlice";
import { useState, useEffect } from "react";
import styles from "./homepage.module.css";

export default function Home() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [leaderboard, setLeaderboard] = useState([]);
    const [hotspots, setHotspots] = useState([]);

    const dispatch = useDispatch()

    const [loggedInUser, setLoggedInUser] = useState(null); 
    const [userMessage, setUserMessage] = useState(""); 

    useEffect(() => {
        const getUserProfile = async() => {
            let token = localStorage.getItem("token");
            
            if (!token) {
                setUserMessage("Please login to view your profile")
                return;
            }

            const response = await fetch("http://localhost:3001/api/auth/me",{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json()

        if(response.status === 200){
            setLoggedInUser(data.user);
            dispatch(setCurrentUser(data.user))
        } else {
            setUserMessage(data.message || "Could not load profile");
        }    
    }; 
    
    getUserProfile();
    }, [dispatch])

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
                <p>🌱 Eco Beginner</p>
                {currentUser && (
                <ProgressBar progressValue={currentUser.points}/>
                )}
                <p>{currentUser?.points || 0} points earned</p>

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