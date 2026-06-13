import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/authSlice";
import Button from "../../components/Button/Button";

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
        <div>
        <h1>LoginPage</h1>
        <label>
            Email: 
            <input name="emailInput"
            value={email}
            onChange = {(event) => {
                setEmail(event.target.value)
            }}/>
        </label>
        <label>
            Password: 
            <input name="passwordInput"
            type="password"
            value={password}
            onChange={(event) => {
                setPassword(event.target.value)
            }}/>
        </label>
        <Button onClick={handleLogin}>
            Login
        </Button>
        <p>
            Don't have an account?
        </p>
        <Button onClick={() => navigate("/signup")}>
            Sign Up
        </Button>

        <p>{loginMessage}</p>

        </div>

    )

}