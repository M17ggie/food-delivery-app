import { TileLayer, MapContainer } from "react-leaflet"

type MapElementProps = {
    onClick?: (event: any) => void
}

const MapElement = () => {
    return <>
        <MapContainer center={[19.097679, 72.845724]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    </>
}

export default MapElement