import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import Card from "../../../components/Card/Card";

export default function EcoLevelCard ({level, title, progress, userPoints, currentUser}) {
    return (
        <Card>
            <h2>Eco Level</h2>
            <p>Level {level}: {title}</p>
            {currentUser && (
                <ProgressBar progressValue={progress}/>
            )}
            <p>{userPoints} points earned</p>
        </Card>

    );
}

