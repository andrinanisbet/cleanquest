import Card from "../../../components/Card/Card";

export default function ProfileHeader ({ username, createdAt}) {

    return (
        <Card>
            <h1>Profile</h1>
            <h2>{username}</h2>
            <p>Member since: {createdAt}</p>
            <p>Ready to make a difference today? Report litter, clean-up a litter hotspot, and earn points!</p>
        </Card>
    );
}