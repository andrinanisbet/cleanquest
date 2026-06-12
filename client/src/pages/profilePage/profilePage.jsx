import { useState, useEffect } from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/authSlice";

export default function ProfilePage (){
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
            </div>
        )
    }

    return <p>Loading profile...</p>
}