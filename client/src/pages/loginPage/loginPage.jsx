import {useState} from "react";

export default function LoginPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    const handleLogin = async () => {
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({email, password})
        });

        const data = await response.json()

        if (response.status === 200) {
            localStorage.setItem("token", data.token)
            setLoginMessage("Login successful!")
        } else {
            setLoginMessage(data.message || "Login failed")
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

        <button onClick={handleLogin}>
            Login
        </button>

        <p>{loginMessage}</p>

        </div>

    )

}