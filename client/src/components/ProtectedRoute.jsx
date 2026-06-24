import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute ({children}) {
    const isCheckingAuth = useSelector((state) => state.auth.isCheckingAuth)
    const currentUser = useSelector((state) => state.auth.currentUser)

    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser && !isCheckingAuth) {
            navigate("/login")
        } 

    }, [isCheckingAuth, currentUser])

    return isCheckingAuth ? <p>Checking user data</p> : !isCheckingAuth && !currentUser ? <p>Please login</p> : children
    

}
