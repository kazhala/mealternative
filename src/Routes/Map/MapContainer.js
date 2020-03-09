/*
  Container for Map component
  Contains required sharable states for Map components
*/

// React
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LocationActions } from '../../Redux/location';

// Components
import Map from './Map';
import ErrorSnack from '../../Common/ErrorModal/ErrorSnack';

const MapContainer = props => {
  // lat, lng info from redux
  const {
    setLocationError,
    locationError,
    clearLocationError,
    lat,
    lng,
    locationOptions,
    getLocation
  } = props;

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
  // selectedMarker to highlight marker
  const [selectedMarker, setSelectedMarker] = useState({});
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
    show: false,
    loading: false,
    details: {}
  });

  const {
    mapsApi,
    autoCompleteService,
    placesServices,
    geoCoderService,
    mapLoaded
    // directionService
  } = googleMap;

  // get user location on page mounts
  useEffect(() => {
    // success call back when getting location
    const locationSuccess = pos => {
      const crd = pos.coords;
      // store the lat lng to redux
      getLocation({ lat: crd.latitude, lng: crd.longitude });
    };
    // error call back
    const locationError = () =>
      setLocationError('Please turn on location services in your phone');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        locationSuccess,
        locationError,
        locationOptions
      );
    } else {
      setLocationError('Sorry, your browser does not support geolocation');
    }
  }, [getLocation, locationOptions, setLocationError]);

  // get the center marker after lat and lng is set in redux
  useEffect(() => {
    if (locationError && !lat && !lng) {
      getLocation({ lat: -33.8568, lng: 151.2153 });
    } else {
      setCenterMarker({ lat, lng });
    }
  }, [lat, lng, locationError, getLocation]);

  // clear all errors
  const handleClearError = () => {
    setError('');
    clearLocationError();
  };

  // check active selected marker
  const checkSelectedMarker = id => {
    return id === selectedMarker.place_id;
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
    setSelectedMarker({});
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
    setSelectedMarker({});
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
      : 'https://res.cloudinary.com/kazhala/image/upload/c_scale,h_1000,w_1500/v1583356356/mealternative/noimage_wclxmf.png';
    resDetail.name = restaurant.name;
    resDetail.rating = restaurant.rating ? restaurant.rating : 0;
    resDetail.price_level = restaurant.price_level;
    resDetail.address = restaurant.formatted_address;
    resDetail.distance = restaurant.distance;
    resDetail.totalRatings = restaurant.user_ratings_total;
    return resDetail;
  };

  // get the individual details with opening_hours and route minutes
  const getDetailedResDetail = restaurant => {
    // set loading
    setInividualModal({ ...individualModal, show: true, loading: true });
    // limit the results returned for cost saving
    const detailRequest = {
      placeId: restaurant.place_id,
      fields: [
        'formatted_phone_number',
        'opening_hours',
        'photos',
        'reviews',
        'url',
        'website',
        'utc_offset_minutes'
      ]
    };

    // get the details
    placesServices.getDetails(detailRequest, (detailRes, detailStatus) => {
      if (detailStatus !== 'OK') {
        clearDetailResDetail();
        console.error('Something went wrong...', detailStatus);
        setError(`Something went wrong, try again later...(${detailStatus})`);
      } else {
        // store all relative information in the state
        setInividualModal(prevState => ({
          ...prevState,
          loading: false,
          details: {
            ...getBasicResDetails(restaurant),
            phone: detailRes.formatted_phone_number
              ? detailRes.formatted_phone_number
              : 'N/A',
            opening_hours: detailRes.opening_hours,
            photos: detailRes.photos,
            reviews: detailRes.reviews,
            url: detailRes.url,
            website: detailRes.website ? detailRes.website : 'N/A'
          }
        }));
        // TODO: maybe add back later
        // if no error, proceed to get the route details for minutes calculation
        // const directionRequest = {
        //   origin: new mapsApi.LatLng(centerMarker.lat, centerMarker.lng),
        //   destination: restaurant.formatted_address, // To
        //   travelMode: 'WALKING'
        // };
        // directionService.route(directionRequest, (routeResult, routeStatus) => {
        //   if (routeStatus !== 'OK') {
        //     clearDetailResDetail();
        //     console.error('Something went wrong...', detailStatus);
        //     setError(
        //       `Something went wrong, try again later...(${detailStatus})`
        //     );
        //   }

        //   // store all relative information in the state
        //   setInividualModal(prevState => ({
        //     ...prevState,
        //     loading: false,
        //     details: {
        //       ...getBasicResDetails(restaurant),
        //       phone: detailRes.formatted_phone_number
        //         ? detailRes.formatted_phone_number
        //         : 'N/A',
        //       opening_hours: detailRes.opening_hours,
        //       photos: detailRes.photos,
        //       reviews: detailRes.reviews,
        //       url: detailRes.url,
        //       website: detailRes.website ? detailRes.website : 'N/A',
        //       minutes: routeResult.routes[0].legs[0].duration
        //     }
        //   }));
        // });
      }
    });
  };

  // clears the state for individual details
  const clearDetailResDetail = () => {
    setInividualModal({ show: false, loading: false, details: {} });
  };

  return (
    <>
      <ErrorSnack
        error={error || locationError}
        handleClose={handleClearError}
      />
      <Map
        {...props}
        handleMapApiLoaded={handleMapApiLoaded}
        mapLoaded={mapLoaded}
        centerMarker={centerMarker}
        checkSelectedMarker={checkSelectedMarker}
        setSelectedMarker={setSelectedMarker}
        handleRestaurantSearch={handleRestaurantSearch}
        handleAutoCompleteUpdate={handleAutoCompleteUpdate}
        updateCenterMarker={updateCenterMarker}
        resLoading={resLoading}
        setResLoading={setResLoading}
        setResultRestaurantList={setResultRestaurantList}
        resultRestaurantList={resultRestaurantList}
        nextPage={nextPage}
        detailOpen={detailOpen}
        setDetailOpen={setDetailOpen}
        getBasicResDetails={getBasicResDetails}
        individualModal={individualModal}
        getDetailedResDetail={getDetailedResDetail}
        clearDetailResDetail={clearDetailResDetail}
        selectedMarker={selectedMarker}
      />
    </>
  );
};

// connect to redux
const mapStateToProps = state => {
  return {
    locationError: state.Location.error,
    lat: state.Location.latitude,
    lng: state.Location.longitude,
    locationOptions: state.Location.options
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getLocation: LocationActions.getLocation,
      setLocationError: LocationActions.setLocationError,
      clearLocationError: LocationActions.clearError
    },
    dispatch
  );
};

MapContainer.propTypes = {
  lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
