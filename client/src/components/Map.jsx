// imports from leaflet
import {
  MapContainer, //map box
  TileLayer, // background map tiles
  Marker, // the pins
  Popup, // pop up when clicked
  useMapEvents, // listens for clicks on map
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // deafault map styling

//  handles map clicks
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e);
    },
  });

  return null;
}
//main component
function Map({ hotspots, onMapClick, onClean, center }) {
  console.log("hotspots recieved:", hotspots);
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "80vh", width: "100%" }}
      >
        // map image layer
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        //connect click to backend
        <MapClickHandler onMapClick={onMapClick} />
        // filter to only show unclean valid markers
        {hotspots
          .filter(
            (spot) =>
              spot.lat !== undefined &&
              spot.lng !== undefined &&
              spot.status !== "cleaned",
          )
          // loops through hotspots and creates pin for each
          .map((spot) => (
            <Marker key={spot.id} position={[spot.lat, spot.lng]}>
              <Popup>
                <div>
                  <h3>{spot.address}</h3>
                  <p>
                    Status:{" "}
                    {spot.status === "cleaned" ? "✅ Cleaned" : "🟡 Uncleaned"}
                  </p>

                  {spot.status !== "cleaned" && (
                    <button onClick={() => onClean(spot.id)}>
                      Mark as cleaned
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default Map;
