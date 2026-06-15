import React from "react";
import styles from "./ProgressBar.module.css";
import getUserLevel from "../../components/ProgressBar/Levels";


class ProgressBar extends React.Component {
    render() {
        const { progressValue } = this.props;
        const rightOffsetString = `${(100 - progressValue) % 100}%`;


     return (
            <div className={styles.progressBarBackground}>
                <div className={styles.progressBar} style={{left: 0, right: rightOffsetString}}></div>
            </div>
        )
};
}
export default ProgressBar;