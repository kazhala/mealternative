import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Map from './Map';

const MapContainer = props => {
  const { lat, lng } = props;
  const [autoCompleteService, setAutoCompleteService] = useState(null);
  const [placesServices, setPlacesServices] = useState(null);
  const [directionService, setDirectionService] = useState(null);
  const [geoCoderService, setGeoCoderService] = useState(null);
  const [currentPositionLatLng, setCurrentPositionLatLng] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [centerMarker, setCenterMarker] = useState({ lat: lat, lng: lng });

  useEffect(() => {
    setCenterMarker({ lat, lng });
  }, [lat, lng]);

  return (
    <Map
      {...props}
      autoCompleteService={autoCompleteService}
      setAutoCompleteService={setAutoCompleteService}
      placesServices={placesServices}
      setPlacesServices={setPlacesServices}
      directionService={directionService}
      setDirectionService={setDirectionService}
      geoCoderService={geoCoderService}
      setGeoCoderService={setGeoCoderService}
      currentPositionLatLng={currentPositionLatLng}
      setCurrentPositionLatLng={setCurrentPositionLatLng}
      mapLoaded={mapLoaded}
      setMapLoaded={setMapLoaded}
      centerMarker={centerMarker}
      setCenterMarker={setCenterMarker}
    />
  );
};

const mapStateToProps = state => {
  return {
    lat: state.Location.latitude,
    lng: state.Location.longitude
  };
};

export default connect(mapStateToProps, null)(MapContainer);
