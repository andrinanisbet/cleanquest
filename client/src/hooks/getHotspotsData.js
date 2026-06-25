//extracted from useHotspots to allow for testing
export default async function getHotspotsData () {
    const response = await fetch("http://localhost:3001/api/hotspots", {
        method: "GET",
    });

    if(!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
    }
    return response.json()

}