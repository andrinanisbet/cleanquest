import ProfileHeader from "../../components/profile/ProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

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
            <div>
                <ProfileHeader user={currentUser}/>
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        )
    }

    return <p>Loading profile...</p>
}