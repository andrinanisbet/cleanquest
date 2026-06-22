import { useState, useEffect } from "react";
import getHotspotsData from "./getHotspotsData";

//Fetches hotspots data on mount and shows loading/error for user feedback
export default function useHotspots () {
    const [hotspots, setHotspots] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadHotspots = async () => {
            try {
                const data = await getHotspotsData()
                setHotspots(data);
            } catch (err) {
                setError(err.message)
            }
            //runs after success or failure
            setLoading(false);  
            };
    
        loadHotspots();
    }, []);

    return {hotspots, loading, error}
}