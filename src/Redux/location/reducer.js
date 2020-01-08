/*
  reducer for handling current location
*/
import * as Types from './types';

const initialState = {
  longitude: '',
  latitude: '',
  // locaion request option
  options: {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
};

const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_CURRENT_LOCATION:
      return {
        ...state,
        longitude: action.payload.lng,
        latitude: action.payload.lat
      };
    default:
      return state;
  }
};

export default LocationReducer;
