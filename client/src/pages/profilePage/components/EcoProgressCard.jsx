import Card from "../../../components/Card/Card";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

export default function EcoProgressCard ({progress, level, title, currentPoints, pointsToNextLevel}) {

    return (
        <Card>
            <h2>Eco Progress</h2>
            <ProgressBar progressValue={progress} />
            <p>Level {level}: {title}</p>
            <p>Points: {currentPoints}</p>
            <p>Points to next level: {pointsToNextLevel}</p>
        </Card>
    ); 
}