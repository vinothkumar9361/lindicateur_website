"use client";

import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

const SearchMaps = () => {
    const defaultProps = {
        center: {
            lat: 50.67258623980253,
            lng: 2.7310132520901758
        },
        zoom: 11
    };
    return (
        <>
            <div className='h-96 lg:h-screen'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </>
    )
}

export default SearchMaps;