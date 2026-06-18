import Card from "../../../components/Card/Card"
import styles from "../homepage.module.css"

export default function CommunityImpactCard ({ totalMembers, hotspotsReported, totalCommunityPoints }) {

    const stats = [
        {label: "Total Members", value: totalMembers}, 
        {label: "Hotspots Reported", value: hotspotsReported}, 
        {label: "Total Community Points", value: totalCommunityPoints}, 
    ]

    return (
        <Card>
            <h2>Community Impact</h2>
            <div className={styles.impactCard}>
                {stats.map((stat) => (
                    <div key={stat.label} className = {styles.impactStatCard}>
                        <h3>{stat.value}</h3>
                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>

        </Card>
    );
}
