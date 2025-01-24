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

const center = {
    lat: -3.745,
    lng: -38.523,
}

const SearchMaps = () => {
    const { Loading, success, errors, CustomerResearchData, CustomerPublicitesList } = useSelector((state: RootState) => state.lindicateur);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyD7xvZFtE4aQWnCIw5UlF8IoayDrYnoiRo',
    })


    const [activeMarker, setActiveMarker] = useState<number | null>(null);

    const [map, setMap] = useState<any>(null);
    const [markerValue, setMarkerValue] = useState<any>([]);



    const getMapMarker = async (city: any, i:number) => {
        console.log(city);

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
        const response = await axios.get(url);
        const { data }: any = response;

        let latitude;
        let longitude;
        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            latitude = parseFloat(lat);
            longitude = parseFloat(lon);

            let marker = {
                id: i+ 1,
                name: city,
                position: {
                    lat: latitude,
                    lng: longitude
                }
            }
            return marker;
        }

    }

    // useEffect(() => {
    //     CustomerPublicitesList?.data?.data?.map((value: any) => {
    //         console.log(value)
    //         let position = getMapMarker(value?.city);
    //         console.log(position);


    //         //     name: "New York, New York",
    //         //     position: { lat: 40.712776, lng: -74.005974 }
    //     });
    //     // setCategoryType(options)
    // }, [CustomerPublicitesList])

    useEffect(() => {
        if (CustomerPublicitesList?.data?.data) {
            CustomerPublicitesList?.data?.data?.forEach((value: any, i:number) => {
                let position = getMapMarker(value?.city, i).then((position) => {
                    setMarkerValue([...markerValue, position])
                    // Now logs the actual object
                }).catch((error) => {
                    console.error("Error fetching map marker:", error);
                });
            });
        }
    }, [CustomerPublicitesList]);

    useEffect(() => {
        if (CustomerResearchData?.data?.data) {
            CustomerResearchData?.data?.data?.forEach((value: any, i:number) => {
                let position = getMapMarker(value?.city, i).then((position) => {
                    setMarkerValue([...markerValue, position])
                    // Now logs the actual object
                }).catch((error) => {
                    console.error("Error fetching map marker:", error);
                });
            });
        }
    }, [CustomerResearchData]);

    console.log(CustomerResearchData);

    console.log(markerValue);


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
                    {markerValue.map(({ id, name, position }:any) => (
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