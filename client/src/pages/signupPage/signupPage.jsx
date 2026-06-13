import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";


export default function SignupPage () {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signupMessage, setSignupMessage] = useState("");
    const navigate = useNavigate();

    const handleCreateAccount = async () => {
        if (password !== confirmPassword){
            setSignupMessage("Passwords do not match")
            return;
        }
        const response = await fetch ("http://localhost:3001/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, email, password})
        });

        const data = await response.json()

        if (response.status === 201){
            setSignupMessage("Sign up successful")
            navigate("/login");
        } else {
            setSignupMessage(data.message || "Signup failed");
        }
    }

    return (
        <div>
            <h1>Sign Up Page</h1>
            <h2>Create Account</h2>
            <label>
                Username:
                <input name="usernameInput"
                value={username}
                onChange={(event) => {
                    setUsername(event.target.value)
                }} />
            </label>
            <label>
                Email:
                <input name="emailInput"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value)
                }} />
            </label>
            <label>
                Password:
                <input name="passwordInput"
                type="password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value)
                }} />
            </label>
            <label>
                Confirm password:
                <input name="confirmPasswordInput"
                type="password"
                value={confirmPassword}
                onChange={(event) => {
                    setConfirmPassword(event.target.value)
                }} />
            </label>
            <Button onClick={handleCreateAccount}>
                Create Account
            </Button>
            <Button onClick={() => navigate("/login")}>
                Already have an account? Login
            </Button>
            {
                signupMessage ? (
                    <p>{signupMessage}</p>
                ) : null
            }



        </div>
    )

}