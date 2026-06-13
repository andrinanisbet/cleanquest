import { useState, useEffect } from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { useDispatch } from "react-redux";
import { clearCurrentUser, setCurrentUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

export default function ProfilePage (){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useState(null); 
    const [userMessage, setUserMessage] = useState(""); 

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(clearCurrentUser());
        navigate("/");
    }

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
            setUserMessage("Your session has expired. Please log in again");
        }    
    }; 
    
    getUserProfile();
    }, [dispatch])

    if (userMessage){
        return <p>{userMessage}</p>
    } 
    
    if(loggedInUser){
        return (
            <div>
                <ProfileHeader user={loggedInUser}/>
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        )
    }

    return <p>Loading profile...</p>
}