// import { useState, useEffect } from 'react';

// export default function ProgressBar ( Points ){
// const progressPercentage = points % 100;
// const [users, setUsers] = useState([]);

// useEffect(() => {
// fetch('/api/users/${id}/points')
// .then(res => res.json())
// .then(data => setUsers(data));
// }, []);

// const progressBar = ({ xp }) => {
//     const progressPercentage = xp % 100;

// return (
//      <> 
//         <div style = {{height: "20px", border: "1px solid #000" }} ></div>
//         <div
//         style={{
//             width:'${progressPercentage}%',
//             backgroundColor: "#4caf50",
//             height: "100%",
//         }}
//         ></div>
//         </>
//     );
// };
// export default progressBar;

import React from "react";
import styles from "./ProgressBar.module.css";


class ProgressBar extends React.Component {
    render() {
        const { progressValue } = this.props;
        const rightOffsetString = `${(1 - progressValue) * 100}%`;

     return (
            <div className="progressBarBackground">
                <div className="progressBar" style={{left: 0, right: rightOffsetString}}></div>
            </div>
        )
};
}
export default ProgressBar;