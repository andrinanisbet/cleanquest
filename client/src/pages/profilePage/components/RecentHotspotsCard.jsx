import styles from "../profilePage.module.css"
import Card from "../../../components/Card/Card"

export default function RecentHotspotsCard ({recentUserHotspots}) {

    return (

        <Card>
            <h2>Recently Reported Hotspots</h2>
            {recentUserHotspots.length > 0 ? (
            <div className={styles.hotspotList}>
            {recentUserHotspots.map((hotspot) => (
                <div key={hotspot.id} className={styles.hotspotCard}>
                Description: {hotspot.description}
                <br />
                Location: {hotspot.address}
                </div>
            ))}
            </div>
                ) : (
                    <p>No hotspots reported yet</p>
                )}   
        </Card>
         
    );

}