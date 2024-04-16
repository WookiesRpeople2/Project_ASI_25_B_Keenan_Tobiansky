import { LatLngExpression } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

type MapProps = {
  name: string
  coordinates: LatLngExpression
}

const Map: React.FC<MapProps> = ({ name, coordinates }) => {
  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "28rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
