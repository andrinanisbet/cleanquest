export default function validateLoginInput (email, password) {
    if (!email || !password) {
       return "Please enter email and password"
    } else {
        return false
    }

}