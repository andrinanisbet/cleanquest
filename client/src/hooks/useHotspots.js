import { useState, useEffect } from "react";
import getHotspotsData from "./getHotspotsData";

export default function useHotspots () {
    const [hotspots, setHotspots] = useState([]); 
    // loading and error are exposed so Home and ProfilePage can show feedback during the fetch
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadHotspots = async () => {
            try {
                //getHotspotsData function was extracted to allow for testing
                const data = await getHotspotsData()
                setHotspots(data);
            } catch (err) {
                setError(err.message)
            }
            // Runs after success or failure, so loading is always set to false after fetch is complete
            setLoading(false);  
            };
    
        loadHotspots();
    }, []);

    return {hotspots, loading, error}
}