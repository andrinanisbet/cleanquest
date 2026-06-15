import React from "react";
import styles from "./ProgressBar.module.css";
import getUserLevel from "../../components/ProgressBar/Levels";


class ProgressBar extends React.Component {
    render() {
        const { progressValue } = this.props;

        const safeProgressValue = Math.min(Math.max(progressValue || 0, 0), 100);

        let progressColor = "#ff8a00";

        if (safeProgressValue >= 90) {
            progressColor = "#2ecc71";
        } else if (safeProgressValue >= 75) {
            progressColor = "#8fd14f";
        } else if (safeProgressValue >= 50) {
            progressColor = "#ffd500";
        } else {
            progressColor = "#ff8a00";
        }
            
     return (
            <div className={styles.progressBarBackground}>
                <div 
                    className={styles.progressBar} 
                    style={{ 
                        width: `${safeProgressValue}%`,
                        backgroundColor: progressColor, 
                        }}>       
                </div>
            </div>
        );
}
}
export default ProgressBar;