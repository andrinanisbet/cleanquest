export default function validateSignupInput (username, email, password, confirmPassword) {

        if (!username || !email || !password) {
            return "Please enter a username, email and password"
        } else if (!confirmPassword){
            return "Please confirm your password"
        } else if (password !== confirmPassword) {
            return "Passwords do not match"
        } else {
            return false
        }
}