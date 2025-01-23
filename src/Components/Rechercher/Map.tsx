`use client`;

import { useState, useCallback } from "react";

import { useJsApiLoader, GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

const markers = [
    {
        id: 1,
        name: "Chicago, Illinois",
        position: { lat: 41.881832, lng: -87.623177 }
    },
    {
        id: 2,
        name: "Denver, Colorado",
        position: { lat: 39.739235, lng: -104.99025 }
    },
    {
        id: 3,
        name: "Los Angeles, California",
        position: { lat: 34.052235, lng: -118.243683 }
    },
    {
        id: 4,
        name: "New York, New York",
        position: { lat: 40.712776, lng: -74.005974 }
    }
];

const center = {
    lat: -3.745,
    lng: -38.523,
}

const SearchMaps = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyD7xvZFtE4aQWnCIw5UlF8IoayDrYnoiRo',
    })

    console.log(isLoaded);


    const [activeMarker, setActiveMarker] = useState<number | null>(null);

    const [map, setMap] = useState<any>(null);

    const handleActiveMarker = (marker: any) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const onLoad = useCallback((map: any) => {
        // Set center and zoom
        // map.setCenter(center);
        // map.setZoom(10);

        // setMap(map);
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="h-96 lg:h-screen">
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {/* Example marker */}
                    {/* <Marker position={center} /> */}
                    {markers.map(({ id, name, position }) => (
                        <Marker
                            key={id}
                            position={position}
                            onClick={() => handleActiveMarker(id)}
                        >
                            {activeMarker === id ? (
                                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                    <div>{name}</div>
                                </InfoWindow>
                            ) : null}
                        </Marker>
                    ))}
                </GoogleMap>
            </div>
        </>
    )
}

export default SearchMaps;