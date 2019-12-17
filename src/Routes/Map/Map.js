import React from 'react';
import useStyles from './Style';
import GoogleMapReact from 'google-map-react';
import { GoogleMapAPIKey } from '../../config';
import PageSpinner from '../../Common/Spinner/PageSpinner';
import LocationInput from './_components/LocationInput';

const Map = props => {
  const {
    lat,
    lng,
    placesServices,
    setPlacesServices,
    autoCompleteService,
    setAutoCompleteService,
    directionService,
    setDirectionService,
    geoCoderService,
    setGeoCoderService,
    currentPositionLatLng,
    setCurrentPositionLatLng,
    mapLoaded,
    setMapLoaded,
    centerMarker,
    setCenterMarker
  } = props;
  const classes = useStyles();

  const handleApiLoaded = (map, maps) => {
    setAutoCompleteService(new maps.places.AutocompleteService());
    setPlacesServices(new maps.places.PlacesService(map));
    setDirectionService(new maps.DirectionsService());
    setGeoCoderService(new maps.Geocoder());
    setCurrentPositionLatLng(new maps.LatLng(lat, lng));
    setMapLoaded(true);
  };

  return (
    <div className={classes.mapRoot}>
      <div className={classes.googleMap}>
        {centerMarker.lat && centerMarker.lng ? (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: GoogleMapAPIKey,
              libraries: ['places', 'directions']
            }}
            center={{ lat: centerMarker.lat, lng: centerMarker.lng }}
            defaultZoom={14}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <TestDrop lat={centerMarker.lat} lng={centerMarker.lng} />
          </GoogleMapReact>
        ) : (
          <PageSpinner />
        )}
      </div>
      {mapLoaded && (
        <LocationInput
          autoCompleteService={autoCompleteService}
          currentPositionLatLng={currentPositionLatLng}
          geoCoderService={geoCoderService}
          setCenterMarker={setCenterMarker}
          lat={lat}
          lng={lng}
        />
      )}
    </div>
  );
};

const TestDrop = () => (
  <div style={{ background: 'black', width: '5px', height: '5px' }}></div>
);

export default Map;
