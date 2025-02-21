`use client`;
import axios from 'axios';

import { useState, useEffect, useCallback, useRef } from "react";

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

        const google_key = "AIzaSyD7xvZFtE4aQWnCIw5UlF8IoayDrYnoiRo";

        let marker: any;
        let latitude: any;
        let longitude: any;

        // const url = `https://api.xn--lindicateur-rfrencement-nccb.fr/admin/getMap?q=${city}`;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${google_key}`;

        let location = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${google_key}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === "OK") {
                    return data;
                    // const bounds = new window.google.maps.LatLngBounds();
                    // bounds.extend(marker.position);
                    // map.fitBounds(bounds);
                    // map.setZoom(12);

                    // if (map) {
                    //     const bounds = new window.google.maps.LatLngBounds();
                    //     bounds.extend(marker.position);

                    //     map.fitBounds(bounds, {
                    //         padding: 100,  // Adjust padding to control zoom
                    //     });
                    // }
                } else {
                    console.error("Geocoding failed:", data.status);
                }
            })
            .catch(error => console.error("Error:", error));

        // const response = await fetch(url);
        // console.log("res", response);

        // const data = await response.json();

        // const { data }: any = response;
        if (location) {
            const { lat, lng } = location?.results[0]?.geometry?.location;
            latitude = parseFloat(lat);
            longitude = parseFloat(lng);

            marker = {
                id: i + 1,
                name: city,
                position: {
                    lat: latitude,
                    lng: longitude
                }
            }
        }
       

        return marker;



    }

    useEffect(() => {
        if (place) {
            let position = getMapMarker(place, 1).then((position: any) => {
                if (position) {
                    setMarkerValue([position])
                    if (map) {
                        // map.setCenter(position.position);  
                        // map.setZoom(12);
                        const bounds = new window.google.maps.LatLngBounds();

                        if (position?.position) {
                            bounds.extend(position?.position);
                            setTimeout(() => {
                                map.fitBounds(bounds, {
                                    padding: 50,
                                });

                                const zoomLevel: any = map.getZoom();

                                if (zoomLevel > 15) {
                                    map.setZoom(15);
                                }

                                const adjustedBounds = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());

                                const paddingOffset = 0.01; // Adjust the padding offset as needed
                                adjustedBounds.extend(new google.maps.LatLng(bounds.getSouthWest().lat() - paddingOffset, bounds.getSouthWest().lng() - paddingOffset));
                                adjustedBounds.extend(new google.maps.LatLng(bounds.getNorthEast().lat() + paddingOffset, bounds.getNorthEast().lng() + paddingOffset));

                                // Apply the adjusted bounds (this simulates padding by adjusting the bounds manually)
                                map.fitBounds(adjustedBounds);

                                // Optionally, manually adjust zoom level after padding if needed
                                const finalZoomLevel = map.getZoom();
                                if (finalZoomLevel > 15) {
                                    map.setZoom(15);
                                }
                            }, 100);
                        }

                        // Set zoom after fitBounds completes
                        // google.maps.event.addListenerOnce(map, 'idle', () => {
                        //     map.setZoom(12);
                        // });
                    }
                }

                // if (map) {
                //         const bounds = new window.google.maps.LatLngBounds();
                //         bounds.extend(position?.position);

                //         map.fitBounds(bounds, {
                //             padding: 1000,  // Adjust padding to control zoom
                //         });
                //     }



            }).catch((error) => {
                console.error("Error fetching map marker:", error);
            });
        }
    }, [place])

    // useEffect(() => {
    //     if (CustomerPublicitesList?.data?.data) {
    //         Promise.all(
    //             CustomerPublicitesList.data.data.map((value: any, i: number) =>
    //                 getMapMarker(value?.address, i)
    //             )
    //         )
    //             .then((positions) => {
    //                 setMarkerValue((prevMarkers: any) => {
    //                     const uniquePositions = positions.filter(
    //                         (pos) => !prevMarkers.some((m: any) => JSON.stringify(m) === JSON.stringify(pos))
    //                     );
    //                     return [...prevMarkers, ...uniquePositions];
    //                 });
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching map markers:", error);
    //             });
    //     }
    // }, [CustomerPublicitesList]);

    // useEffect(() => {
    //     if (CustomerResearchData?.data?.data) {
    //         Promise.all(
    //             CustomerResearchData.data.data.map((value: any, i: number) =>
    //                 getMapMarker(value?.address, i)
    //             )
    //         )
    //             .then((positions) => {
    //                 setMarkerValue((prevMarkers: any) => {
    //                     const uniquePositions = positions.filter(
    //                         (pos) => !prevMarkers.some((m: any) => JSON.stringify(m) === JSON.stringify(pos))
    //                     );
    //                     return [...prevMarkers, ...uniquePositions];
    //                 });
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching map markers:", error);
    //             });
    //     }
    // }, [CustomerResearchData]);

    const handleActiveMarker = (marker: any) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const onLoad = useCallback((map: any) => {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        // map.fitBounds(bounds);
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
                    zoom={6}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{
                        restriction: {
                            latLngBounds: {
                                north: 51.124199,
                                south: 41.314199,
                                west: -5.142222,
                                east: 9.561556,
                            },
                            strictBounds: true,
                        },
                    }}
                >
                    {
                        markerValue?.length > 0 ?
                            <>
                                {markerValue?.map(({ id, name, position }: any) => {
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
                            </>
                            : null
                    }

                </GoogleMap>
            </div>
        </>
    )
}

export default SearchMaps;