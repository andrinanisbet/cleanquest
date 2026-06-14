import React from "react";
import styles from "./ProgressBar.module.css";


class ProgressBar extends React.Component {
    render() {
        const { progressValue } = this.props;
        const rightOffsetString = `${(100 - progressValue) % 100}%`;

        const Levels = [
            {min: 0, title: "Eco Beginner 🌱"},
            {min: 100, title: "Green Explorer 🍃"},
            {min: 200, title: "Planet Protector 🌏"},
            {min: 300, title: "Enviromental Legend🪴"}
        ];

        function getLevel(points) {
            let level = 0;

            for (let i = 0; i < Levels.length; i++) {
                if ( points >= Levels[i].min) {
                    level = i
                }
            }
            return {
                level,
                title: Levels[level].title
            };
        }
        

     return (
        <>
            <p>{title} level {level} </p>
            <div className={styles.progressBarBackground}>
                <div className={styles.progressBar} style={{left: 0, right: rightOffsetString}}></div>
            </div>
        </>
        )

//      return (
//             <div className={styles.progressBarBackground}>
//                 <div className={styles.progressBar} style={{left: 0, right: rightOffsetString}}></div>
//             </div>
//         )
};
}
export default ProgressBar;