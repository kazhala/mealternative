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
  const [googleMap, setGoogleMap] = useState({
    mapsApi: null,
    autoCompleteService: null,
    placesServices: null,
    directionService: null,
    geoCoderService: null,
    mapLoaded: false
  });

  // center lat lng position
  const [centerMarker, setCenterMarker] = useState({});
  // determine if request data loading
  const [resLoading, setResLoading] = useState(false);
  // stores the searched restaurant into array
  const [resultRestaurantList, setResultRestaurantList] = useState([]);
  // stores the information and method to call next page from google map
  const [nextPage, setNextPage] = useState(null);
  // determine if the detailed information modal should be opened
  const [detailOpen, setDetailOpen] = useState(false);

  const {
    mapsApi,
    autoCompleteService,
    placesServices,
    directionService,
    geoCoderService,
    mapLoaded
  } = googleMap;

  // get the center marker after lat and lng is set in redux
  useEffect(() => {
    setCenterMarker({ lat, lng });
  }, [lat, lng]);

  // Initiate google map services after map is loaded
  const handleMapApiLoaded = (map, maps) => {
    setGoogleMap({
      ...googleMap,
      mapsApi: maps,
      autoCompleteService: new maps.places.AutocompleteService(),
      placesServices: new maps.places.PlacesService(map),
      directionService: new maps.DirectionsService(),
      geoCoderService: new maps.Geocoder(),
      mapLoaded: true
    });
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

  // format the price level
  const checkPriceLevel = price => {
    switch (price) {
      case 1:
        return '$';
      case 2:
        return '$$';
      case 3:
        return '$$$';
      default:
        return '$';
    }
  };

  // fetch restaurants data
  const handleRestaurantSearch = (queryType, queryRadius) => {
    setResLoading(true);
    // 1. Create places request (if no queryType, than default restaurant)
    // will update the no queryType request later using nearbySearch api
    const placesRequest = {
      location: new mapsApi.LatLng(centerMarker.lat, centerMarker.lng),
      type: ['restaurant', 'cafe'],
      query: queryType ? queryType : 'restaurant'
      // rankBy cannot be used with radius at the same time
      // rankBy doesn't seem to work with textSearch, keep it for future reference
      // radius: '500',
      // rankBy: mapsApi.places.RankBy.DISTANCE
    };

    // perform textSearch based on query passed in ('chinese', 'thai', etc)
    placesServices.textSearch(
      placesRequest,
      (locationResults, status, paginationInfo) => {
        if (status !== 'OK') {
          setResLoading(false);
          console.error('No results found', status);
        } else {
          // temp list to keep current result, only update state once
          let tempResultList = [];
          for (let i = 0; i < locationResults.length; i++) {
            if (
              // distance check, see if it's in range
              mapsApi.geometry.spherical.computeDistanceBetween(
                locationResults[i].geometry.location,
                placesRequest.location
              ) <
              queryRadius * 1000
            ) {
              // format price level
              locationResults[i].price_level = checkPriceLevel(
                locationResults[i].price_level
              );
              // if in range, push it in temp list
              tempResultList.push(locationResults[i]);
            }
          }
          // store nextPage information to state
          setNextPage(paginationInfo);
          // update state results
          setResultRestaurantList(prevList => {
            const newList = [...prevList, ...tempResultList];
            return newList;
          });
          //cancel loading
          setResLoading(false);
        }
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
      setResultRestaurantList={setResultRestaurantList}
      resultRestaurantList={resultRestaurantList}
      nextPage={nextPage}
      detailOpen={detailOpen}
      setDetailOpen={setDetailOpen}
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
