import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

export default function App() {
  //markers

  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "Hello I am pop up 1",
    },
    {
      geocode: [48.87, 2.3522],
      popUp: "Hello I am pop up 2",
    },
    {
      geocode: [48.85, 2.3522],
      popUp: "Hello I am pop up 3",
    },
  ];

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5847/5847891.png",
    iconSize: [38, 38],
  });

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={13}
      style={{ height: "500px", width: "500px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.geocode} icon={customIcon}>
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
