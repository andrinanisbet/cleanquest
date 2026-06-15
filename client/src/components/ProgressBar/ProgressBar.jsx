import React from "react";
import styles from "./ProgressBar.module.css";
import getUserLevel from "../../components/ProgressBar/Levels";


class ProgressBar extends React.Component {
    render() {
        const { progressValue } = this.props;

        const safeProgressValue = Math.min(Math.max(progressValue || 0, 0), 100);


     return (
            <div className={styles.progressBarBackground}>
                <div className={styles.progressBar} style={{ width: `${safeProgressValue}%` }}>       
                </div>
            </div>
        );
}
}
export default ProgressBar;