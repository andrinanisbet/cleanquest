import styles from "./ProfileHeader.module.css";
import ProgressBar from "../../components/ProgressBar/ProgressBar";


export default function ProfileHeader (props){
    return (
        <>
        <h1>Profile</h1>
        <div className="user-card">
            <ProgressBar progressValue={props.user.points}/>
            <h2>{props.user.username}</h2>
            <p>Member since: {props.user.created_at}</p>
            <p>Points: {props.user.points}</p>
            <p>Streak: {props.user.streak}</p>
            <p>Last Cleanup Date: {props.user.last_cleanup_date}</p>
        </div>
        </>
        

    )


}