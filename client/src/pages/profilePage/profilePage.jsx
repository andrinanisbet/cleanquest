import ProfileHeader from "../../components/profile/ProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./profilePage.module.css";


export default function ProfilePage (){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.currentUser); 

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(clearCurrentUser());
        navigate("/");
    }
    
    if(currentUser){
        return (
            <div className ={styles.profilePage}>

                <div className ={styles.profileCard}>
                    <ProfileHeader user={currentUser}/>
                     <p>Ready to make a difference today? Report litter, join an event, and earn points!</p>
                </div>

                <div className={styles.profileCard}>
                    <h2>Achievements</h2>
                    <p>Total clean-ups completed:</p>
                    <p>Total clean-ups reported</p>
                </div>

                <div className={styles.profileCard}>
                    <h2>Recent Activity</h2>
                    <p></p>
                </div>

                <div className={styles.profileCard}>
                    <h2>My Saved Hotspots</h2>

                </div>

                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        );
    }

    return <p>Loading profile...</p>
}