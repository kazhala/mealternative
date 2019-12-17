import React, { useEffect, useState } from 'react';
import Map from './Map';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const MapContainer = props => {
  const [currentPosition, setCurrentPosition] = useState({});

  useEffect(() => {
    const locationSuccess = pos => {
      const crd = pos.coords;
      setCurrentPosition({ lat: crd.latitude, lng: crd.longitude });
    };
    const locationError = err => console.log(err);

    navigator.geolocation.getCurrentPosition(
      locationSuccess,
      locationError,
      options
    );
  }, []);

  return (
    <Map
      {...props}
      currentPosition={currentPosition}
      setCurrentPosition={setCurrentPosition}
    />
  );
};

export default MapContainer;
