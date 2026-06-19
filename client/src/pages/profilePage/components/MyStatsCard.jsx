import Card from "../../../components/Card/Card"
export default function MyStatsCard ({userStreak, lastCleanupDate, userRank, hotspotsReported}) {

    return(
        <Card>
            <h2>My Stats</h2>
            <p>Streak: {userStreak}</p>
            <p>Last Cleanup Date: {lastCleanupDate}</p>
            <p>Rank: {userRank > 0 ? `#${userRank}` : "Loading..."}</p>
            <p>Hotspots reported: {hotspotsReported}</p>

        </Card>              
                       
    );

}