import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/authSlice";
import Button from "../../components/Button/Button";
import styles from "./loginPage.module.css";

export default function LoginPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const response = await fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({email, password})
        });

        const data = await response.json()

        if (response.status === 200) {
            localStorage.setItem("token", data.token);
            dispatch(setCurrentUser(data.user));
            navigate("/home");

        } else {
            setLoginMessage(data.message || "Login failed");
        }

    }

    return(
        <div className={styles.loginPage}>
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