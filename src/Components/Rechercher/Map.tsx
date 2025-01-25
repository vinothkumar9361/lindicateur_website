`use client`;
import axios from 'axios';

import { useState, useEffect, useCallback } from "react";

import { useJsApiLoader, GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

import { useSelector } from 'react-redux';

import { RootState, AppDispatch } from '@/store/store';

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


const SearchMaps = ({ place }: any) => {
    const { Loading, success, errors, CustomerResearchData, CustomerPublicitesList } = useSelector((state: RootState) => state.lindicateur);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyD7xvZFtE4aQWnCIw5UlF8IoayDrYnoiRo',
    })

    const [activeMarker, setActiveMarker] = useState<number | null>(null);

    const [map, setMap] = useState<any>(null);
    const [markerValue, setMarkerValue] = useState<any>([]);

    const getMapMarker = async (city: any, i: number) => {
        console.log("city", city);
        
        const url = `https://api.xn--lindicateur-rfrencement-nccb.fr/admin/getMap?q=${city}`;
        const response = await fetch(url);
        console.log("res", response);
        
        const data = await response.json();

        // const { data }: any = response;

        let latitude: any;
        let longitude: any;
        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            latitude = parseFloat(lat);
            longitude = parseFloat(lon);

            let marker = {
                id: i + 1,
                name: city,
                position: {
                    lat: latitude,
                    lng: longitude
                }
            }
            return marker;
        }

    }

    useEffect(() => {
        if (place) {
            console.log("place", place);

            let position = getMapMarker(place, 1).then((position) => {
                setMarkerValue([position])
            }).catch((error) => {
                console.error("Error fetching map marker:", error);
            });
        }
    }, [place])

    useEffect(() => {
        if (CustomerPublicitesList?.data?.data) {
            Promise.all(
                CustomerPublicitesList.data.data.map((value: any, i: number) =>
                    getMapMarker(value?.city, i)
                )
            )
                .then((positions) => {
                    setMarkerValue((prevMarkers:any) => {
                        const uniquePositions = positions.filter(
                            (pos) => !prevMarkers.some((m:any) => JSON.stringify(m) === JSON.stringify(pos))
                        );
                        return [...prevMarkers, ...uniquePositions];
                    });
                })
                .catch((error) => {
                    console.error("Error fetching map markers:", error);
                });
        }
    }, [CustomerPublicitesList]);

    useEffect(() => {
        if (CustomerResearchData?.data?.data) {
            Promise.all(
                CustomerResearchData.data.data.map((value: any, i: number) =>
                    getMapMarker(value?.city, i)
                )
            )
                .then((positions) => {
                    setMarkerValue((prevMarkers:any) => {
                        const uniquePositions = positions.filter(
                            (pos) => !prevMarkers.some((m:any) => JSON.stringify(m) === JSON.stringify(pos))
                        );
                        return [...prevMarkers, ...uniquePositions];
                    });
                })
                .catch((error) => {
                    console.error("Error fetching map markers:", error);
                });
        }
    }, [CustomerResearchData]);

    const handleActiveMarker = (marker: any) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const onLoad = useCallback((map: any) => {
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
                    center={{ lat: 46.603354, lng: 1.888334 }}
                    zoom={8}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {markerValue.map(({ id, name, position }: any) => {
                        return (
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
                        )
                    })}
                </GoogleMap>
            </div>
        </>
    )
}

export default SearchMaps;