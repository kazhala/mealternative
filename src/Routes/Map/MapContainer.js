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
  // determine if request data loading
  const [resLoading, setResLoading] = useState(false);
  // stores the searched restaurant into array
  const [resultRestaurantList, setResultRestaurantList] = useState([]);
  const [nextPage, setNextPage] = useState(null);

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

  const handleAutoCompleteUpdate = (searchValue, callBack) => {
    // prepare query for google autoCompleteService
    const searchQuery = {
      input: searchValue,
      location: new mapsApi.LatLng(lat, lng),
      radius: 100000 // in Meters. 100km
    };
    // if there is input, perform google autoCompleteService request
    searchQuery.input &&
      autoCompleteService.getQueryPredictions(searchQuery, response => {
        // The name of each GoogleMaps place suggestion is in the "description" field
        if (response) {
          const dataSource = response.map(resp => resp.description);
          // set the autoCompletion's options
          callBack(dataSource);
        }
      });
  };

  // relocate the center of the map based on user input
  // 0 means default location, 1 is user input location
  const updateCenterMarker = (type, address) => {
    if (type === 0) {
      setCenterMarker({ lat, lng });
    } else {
      // decode the address to latlng
      geoCoderService.geocode({ address }, response => {
        if (!response[0]) {
          console.error("Can't find the address");
          // if empty, than change to user location stored in redux
          setCenterMarker({ lat, lng });
          return;
        }
        const { location } = response[0].geometry;
        setCenterMarker({ lat: location.lat(), lng: location.lng() });
      });
    }
  };

  // fetch restaurants data
  const handleRestaurantSearch = queryType => {
    setResLoading(true);
    setResultRestaurantList([]);
    // 1. Create places request (if no queryType, than default restaurant)
    // will update the no queryType request later using nearbySearch api
    const placesRequest = {
      location: new mapsApi.LatLng(centerMarker.lat, centerMarker.lng),
      type: ['restaurant', 'cafe'],
      query: queryType ? queryType : 'restaurant',
      // rankBy cannot be used with radius at the same time
      rankBy: mapsApi.places.RankBy.DISTANCE
      // radius: '5000'
    };
    // perform textsearch based on query passed in ('chinese', 'thai', etc)
    placesServices.textSearch(
      placesRequest,
      (locationResults, status, paginationInfo) => {
        if (status !== 'OK') {
          setResLoading(false);
          console.error('No results found', status);
          return;
        }
        setNextPage(paginationInfo);
        setResultRestaurantList(locationResults);
        setResLoading(false);
      }
    );
  };

  return (
    <Map
      {...props}
      handleMapApiLoaded={handleMapApiLoaded}
      mapLoaded={mapLoaded}
      centerMarker={centerMarker}
      handleRestaurantSearch={handleRestaurantSearch}
      handleAutoCompleteUpdate={handleAutoCompleteUpdate}
      updateCenterMarker={updateCenterMarker}
      resLoading={resLoading}
      resultRestaurantList={resultRestaurantList}
      nextPage={nextPage}
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
