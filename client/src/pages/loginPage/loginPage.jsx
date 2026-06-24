import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/authSlice";
import Button from "../../components/Button/Button";
import styles from "./loginPage.module.css";
import validateLoginInput from "./validateLoginInput";

export default function LoginPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [banner, setBanner] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect (() => {
        if(location.state?.banner) {

            setBanner("Sign up successful, please login")
            setTimeout(() => setBanner(""), 2000); 
        }
        
    },[])

    const handleLogin = async () => {

        const loginValidationResult = validateLoginInput(email, password);

        if (loginValidationResult) {
            setLoginMessage(loginValidationResult)
            return
        }

        try {
            const response = await fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({email, password})
            });

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("token", data.token);
                dispatch(setCurrentUser(data.user));
                navigate("/home");
            } else {
                setLoginMessage(data.message || "Login failed, please check your email and password");
            }

            } catch (error) {
                setLoginMessage("Unable to login, please check your connection and try again")
                console.error(error.message)

        }
    }

    return(
        <div className={styles.loginPage}>
            {banner && (<div className={styles.banner}>{banner}</div>)}
            <section className={styles.loginCard}>
                <h1>Welcome back</h1>
                <p>Log in to continue your CleanQuest journey.</p>

                <label>
                    Email: 
                    <input 
                    name="emailInput"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange = {(event) => {
                        setEmail(event.target.value)
                    }}/>
                </label>
                <label>
                    Password: 
                    <input 
                    name="passwordInput"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}/>
                </label>
                <Button 
                className={styles.loginButton}
                onClick={handleLogin}
                >
                    Login
                </Button>
                <div className={styles.signupSection}>
                    <p>Don't have an account?</p>
                    <Button onClick={() => navigate("/signup")}>
                        Sign Up
                    </Button>
                </div>


                {loginMessage && (
                    <p className={styles.errorMessage}>
                        {loginMessage}
                    </p>
                )}
            </section>
        </div>

    )

}