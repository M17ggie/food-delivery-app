import { TileLayer, MapContainer, useMapEvents, Marker, Popup } from "react-leaflet";
import { useState, useEffect, useMemo } from 'react'

interface MapElementProps {
    location?: { lat: number | null, lng: number | null },
    showMarker?: boolean,
    getPositionHandler?: (latitude: number, longitude: number) => void
}

const MapElement = ({ showMarker, getPositionHandler, location }: MapElementProps) => {

    const isLocation = useMemo(() => {
        return Object.values(location!).every(x => x !== null && typeof x !== 'string')
    }, [location])

    const [position, setPosition] = useState<any>(isLocation ? location : null);

    const AddMarker = () => {
        useMapEvents({
            click(e) {
                setPosition(e.latlng)
                getPositionHandler?.(e.latlng.lat, e.latlng.lng)
            }
        });

        useEffect(() => {
            setPosition(isLocation ? location : position)
        }, [location])



        return position === null ? null : (
            <Marker position={position} />
        )
    }

    return <>
        <MapContainer center={[19.097679, 72.845724]} zoom={13} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {showMarker ? <AddMarker /> : null}
        </MapContainer>
    </>
}

export default MapElement