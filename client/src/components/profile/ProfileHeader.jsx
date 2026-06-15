import styles from "./ProfileHeader.module.css";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import getUserLevel from "../../components/ProgressBar/Levels";

export default function ProfileHeader (props){
    const currentPoints = props.user?.points || 0;
    
    const { level, title, progress, pointsToNextLevel } = getUserLevel(currentPoints);

    return (
       <>
        <h1>Profile</h1>
        <div className={styles.userCard}>
            <h2>{props.user.username}</h2>
            <p>Level {level}: {title}</p>
            <ProgressBar progressValue={progress} />
            <p>Member since: {props.user.created_at}</p>
            <p>Points: {currentPoints}</p>
            <p>Streak: {props.user.streak}</p>
            <p>Last Cleanup Date: {props.user.last_cleanup_date}</p>
        </div>
        </>
        

    )


}