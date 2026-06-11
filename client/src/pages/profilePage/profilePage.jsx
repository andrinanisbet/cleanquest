import { useState, useEffect } from "react";

export default function ProfilePage (){
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
        } else {
            setUserMessage(data.message || "Could not load profile");
        }    
    }; 
    
    getUserProfile();
    }, [])

    if (userMessage){
        return <p>{userMessage}</p>
    } 
    
    if(loggedInUser){
        return (
            <div>
                <h1>{loggedInUser.username}</h1>
                 <p>{loggedInUser.email}</p>
            </div>
        )
    }

    return <p>Loading profile...</p>
}