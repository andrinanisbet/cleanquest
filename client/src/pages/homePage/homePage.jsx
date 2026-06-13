// import HomeProgressBar from "./HomePageProgressBar"
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from "../../store/authSlice";
import { useState, useEffect } from "react";

export default function Home() {
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

    const currentUser = useSelector((state) => state.auth.currentUser)
return (
<> 
<h1>Home</h1>

{currentUser && (
<ProgressBar progressValue={currentUser.points}/>
)}
</>
);
};
