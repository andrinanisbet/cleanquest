import { useState, useEffect } from "react";

//Fetches hotspots data on mount and shows loading/error for user feedback
export default function useHotspots () {
    const [hotspots, setHotspots] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getHotspotsData = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/hotspots", {
                method: "GET",
                });

                if(!response.ok) {
                    throw new Error(`Request failed: ${response.status}`)
                }

                const data = await response.json();
                setHotspots(data);
            } catch (err) {
                setError(err.message)
            }
            //runs after success or failure
            setLoading(false);  
            };
    
        getHotspotsData();
    }, []);

    return {hotspots, loading, error}
}