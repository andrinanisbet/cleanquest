import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import Card from "../../../components/Card/Card";

export default function EcoLevelCard ({level, title, progress, userPoints, currentUser}) {
    return (
        <Card>
            <h2>Eco Level</h2>
            <p>Level {level}: {title}</p>
            {/* currentUser will always be true here since ProtectedRoute guards this page
                check kept as a safeguard in case that ever changes */}
            {currentUser && (
                <ProgressBar progressValue={progress}/>
            )}
            <p>{userPoints} points earned</p>
        </Card>

    );
}

