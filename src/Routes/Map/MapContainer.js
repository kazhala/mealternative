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
import ErrorModal from '../../Common/ErrorModal/ErrorModal';

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
  // stores the error state
  const [error, setError] = useState('');
  // determine if the detail modal should be opened
  const [individualModal, setInividualModal] = useState({
    place_id: '',
    details: {}
  });

  const {
    mapsApi,
    autoCompleteService,
    placesServices,
    geoCoderService,
    mapLoaded
  } = googleMap;

  // get the center marker after lat and lng is set in redux
  useEffect(() => {
    setCenterMarker({ lat, lng });
  }, [lat, lng]);

  const handleClearError = () => {
    setError('');
  };

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
          setError("Can't find the address");
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

  // format the distance for sorting later
  const calculateDistance = (restaurantLocation, centerLocation) => {
    return mapsApi.geometry.spherical.computeDistanceBetween(
      restaurantLocation,
      centerLocation
    );
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
          setError(`No results found ${status}`);
        } else {
          // temp list to keep current result, only update state once
          let tempResultList = [];
          for (let i = 0; i < locationResults.length; i++) {
            if (
              // distance check, see if it's in range
              calculateDistance(
                locationResults[i].geometry.location,
                placesRequest.location
              ) <
              queryRadius * 1000
            ) {
              locationResults[i].raw_price = locationResults[i].price_level
                ? locationResults[i].price_level
                : 1;
              // format price level
              locationResults[i].price_level = checkPriceLevel(
                locationResults[i].price_level
              );
              locationResults[i].distance = calculateDistance(
                locationResults[i].geometry.location,
                placesRequest.location
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

  // get and format all details needed to display
  const getBasicResDetails = restaurant => {
    let resDetail = {};
    // display no photo image if no photo
    resDetail.photoUrl = restaurant.photos
      ? restaurant.photos[0].getUrl()
      : 'https://nucomltd.com/wp-content/themes/gecko/assets/images/placeholder.png';
    resDetail.name = restaurant.name;
    resDetail.rating = restaurant.rating ? restaurant.rating : 0;
    resDetail.price_level = restaurant.price_level;
    resDetail.address = restaurant.formatted_address;
    resDetail.distance = restaurant.distance;
    resDetail.totalRatings = restaurant.user_ratings_total;
    // google map link for more details or route direaction
    resDetail.googleMapLink = `https://www.google.com/maps/search/?api=1&query=${restaurant.geometry.location.lat()},${restaurant.geometry.location.lng()}&query_place_id=${
      restaurant.place_id
    }`;
    return resDetail;
  };

  // eslint-disable-next-line
  const getDetailedResDetail = restaurant => {
    //
  };

  return (
    <>
      <ErrorModal error={error} handleClose={handleClearError} />
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
        getBasicResDetails={getBasicResDetails}
        individualModal={individualModal}
        setInividualModal={setInividualModal}
      />
    </>
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
