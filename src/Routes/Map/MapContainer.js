/*
  Container for Map component
  Contains required sharable states for Map components
*/

// React
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import Map from './Map';

const MapContainer = props => {
  // lat, lng info from redux
  const { lat, lng } = props;

  // google map services
  const [mapsApi, setMapsApi] = useState(null);
  const [autoCompleteService, setAutoCompleteService] = useState(null);
  const [placesServices, setPlacesServices] = useState(null);
  const [directionService, setDirectionService] = useState(null);
  const [geoCoderService, setGeoCoderService] = useState(null);

  // determine if map is loaded
  const [mapLoaded, setMapLoaded] = useState(false);
  // center lat lng position
  const [centerMarker, setCenterMarker] = useState({});

  // get the center marker after lat and lng is set in redux
  useEffect(() => {
    setCenterMarker({ lat, lng });
  }, [lat, lng]);

  // Initiate google map services after map is loaded
  const handleMapApiLoaded = (map, maps) => {
    setMapsApi(maps);
    setAutoCompleteService(new maps.places.AutocompleteService());
    setPlacesServices(new maps.places.PlacesService(map));
    setDirectionService(new maps.DirectionsService());
    setGeoCoderService(new maps.Geocoder());
    setMapLoaded(true);
  };

  const handleRestaurantSearch = (queryType, distanceType) => {
    // 1. Create places request
    const placesRequest = {
      location: new mapsApi.LatLng(centerMarker.lat, centerMarker.lng),
      type: ['restaurant', 'cafe'],
      query: queryType ? queryType : 'restaurant',
      rankBy: mapsApi.places.RankBy.DISTANCE
      // radius: '5000'
    };

    placesServices.textSearch(
      placesRequest,
      (locationResults, status, extraInfo) => {
        console.log(locationResults);
        console.log(status);
        console.log(extraInfo);
        // extraInfo.nextPage((h1, h2, h3) => console.log(h1, h2, h3));
        const testPlace = locationResults[0];
        let travelMode;
        switch (distanceType) {
          case 0:
            travelMode = 'WALKING';
            break;
          case 1:
            travelMode = 'BICYCLING';
            break;
          default:
            travelMode = 'DRIVING';
            break;
        }
        const directionRequest = {
          origin: new mapsApi.LatLng(centerMarker.lat, centerMarker.lng),
          destination: testPlace.formatted_address, // To
          travelMode
        };
        directionService.route(directionRequest, (routeResult, status) => {
          if (status !== 'OK') return;
          const travellingRoute = routeResult.routes[0].legs[0];
          const travellingTimeInMinutes = travellingRoute.duration.value / 60;
          console.log(routeResult);
        });
      }
    );
  };

  return (
    <Map
      {...props}
      mapsApi={mapsApi}
      handleMapApiLoaded={handleMapApiLoaded}
      autoCompleteService={autoCompleteService}
      placesServices={placesServices}
      directionService={directionService}
      geoCoderService={geoCoderService}
      mapLoaded={mapLoaded}
      centerMarker={centerMarker}
      setCenterMarker={setCenterMarker}
      handleRestaurantSearch={handleRestaurantSearch}
    />
  );
};

// connect to redux
const mapStateToProps = state => {
  return {
    lat: state.Location.latitude,
    lng: state.Location.longitude
  };
};

MapContainer.propTypes = {
  lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default connect(mapStateToProps, null)(MapContainer);
