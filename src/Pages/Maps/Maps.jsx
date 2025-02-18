import React from 'react';
import './Maps.css'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// ... other imports

const Maps = ({ onMarkerClick }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'googleMaps',
    googleMapsApiKey: 'AIzaSyBGHRVCPUnavbW_mtAOxS_2TK7qqGLT9JY', // Replace with your API key
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleMarkerClick = (marker, businessId) => {
      onMarkerClick(businessId);
  }

  const markers = [
      {position: {lat: 37.7749, lng: -122.4194}, id: 1},
      {position: {lat: 34.0522, lng: -118.2437}, id: 2}
  ]

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={{ width: '400px', height: '300px' }}
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map(marker => (
            <Marker 
                key={marker.id} 
                position={marker.position} 
                onClick={() => handleMarkerClick(marker, marker.id)}
            />
        ))}
      </GoogleMap>
  ) : <></>;
};

export default Maps;