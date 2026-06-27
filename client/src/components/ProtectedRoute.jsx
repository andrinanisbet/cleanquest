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

    /*
    while auth check is still loading, "Checking user data is rendered"
    if auth check is complete and no user is logged in, "Please login" is rendered
    if auth check is complete and user is logged in, the full page renders
    */

    return isCheckingAuth ? <p>Checking user data</p> : !isCheckingAuth && !currentUser ? <p>Please login</p> : children
    

}
