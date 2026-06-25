import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./signupPage.module.css";
import validateSignupInput from "./validateSignupInput";


export default function SignupPage () {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signupMessage, setSignupMessage] = useState("");
    const navigate = useNavigate();

    const handleCreateAccount = async () => {

        // validation extracted to its own function to allow unit testing
        const signupValidationResult = validateSignupInput(username, email, password, confirmPassword)

        if (signupValidationResult){
            setSignupMessage(signupValidationResult)
            return
        }

        try {
            const response = await fetch ("http://localhost:3001/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, email, password})
            });

            const data = await response.json()

            if (response.ok){
                // passes banner via navigation state, read by LoginPage to show a signup success message
                navigate("/login", {state: {banner: true}});
            } else {
                setSignupMessage(data.message || "Signup failed");
            }

        // generic fallback message for network/connection failures
        } catch (error) {
            setSignupMessage("Unable to complete sign up, please check your connection and try again")
            console.error(error.message)
        }
    }

    return (
        <div className={styles.signupPage}>
            <section className={styles.signupCard}>
                <h1>Create Account</h1>
                <p>Join CleanQuest and start making a difference.</p>
                <label>
                    Username:
                    <input 
                    name="usernameInput"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value)
                    }} />
                </label>
                <label>
                    Email:
                    <input 
                    type="email"
                    name="emailInput"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }} />
                </label>
                <label>
                    Password:
                    <input 
                    name="passwordInput"
                    placeholder="Choose your password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }} />
                </label>
                <label>
                    Confirm password:
                    <input 
                    name="confirmPasswordInput"
                    placeholder="Confirm your password"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => {
                        setConfirmPassword(event.target.value)
                    }} />
                </label>
                <Button 
                    className={styles.signupButton}
                    onClick={handleCreateAccount}
                >
                    Create Account
                </Button>
                <div className={styles.signupSection}>
                    <p>Already have an account?</p>
                    <Button 
                    className={styles.loginButton}
                    onClick={() => navigate("/login")}>
                        Login
                    </Button>
                </div>
                
                {signupMessage && (
                    <p className={styles.errorMessage}>
                        {signupMessage}
                    </p>
               )}
            </section>
            
        </div>
    )

}