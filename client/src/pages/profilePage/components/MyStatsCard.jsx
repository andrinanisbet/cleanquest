import Card from "../../../components/Card/Card"
export default function MyStatsCard ({userStreak, lastCleanupDate, userRank, hotspotsReported}) {

    return(
        <Card>
            <h2>My Stats</h2>
            <p>Streak: {userStreak}</p>
            <p>Last Cleanup Date: {lastCleanupDate}</p>
            {/* userRank should always be a real number here since ProtectedRoute guarantees a logged-in user
                and ProfilePage only renders this once leaderboard/hotspots have loaded, fallback kept as a safeguard */}
            <p>Rank: {userRank > 0 ? `#${userRank}` : "Loading..."}</p>
            <p>Hotspots reported: {hotspotsReported}</p>

        </Card>              
                       
    );

}