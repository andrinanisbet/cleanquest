import Card from "../../../components/Card/Card";

export default function WelcomeCard ({ username }) {
    return (
        <Card>
            <h1>Welcome back{username ? `, ${username}`: ""}!</h1>
            <p>Ready to make a difference today? Report litter, join an event, and earn points!</p>
        </Card>
    ); 
}