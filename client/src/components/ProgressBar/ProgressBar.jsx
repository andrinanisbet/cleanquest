import { useState, useEffect } from 'react';

export default function ProgressBar ( Points ){
const progressPercentage = points % 100;
const [users, setUsers] = useState([]);

useEffect(() => {
fetch('/api/users/${id}/points')
.then(res => res.json())
.then(data => setUsers(data));
}, []);

return (
     <> 
        <div style = {{height: "20px", border: "1px solid #000" }} ></div>
        <div
        style={{
            width:'${progressPercentage}%',
            backgroundColor: "#4caf50",
            height: "100%",
        }}
        ></div>
        </>
    );
};
