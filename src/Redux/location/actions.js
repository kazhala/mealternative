import * as Types from './types';

export const getLocation = payload => {
  return {
    type: Types.SET_CURRENT_LOCATION,
    payload
  };
};

export const setLocationError = payload => {
  return {
    type: Types.LOCATION_ERROR,
    payload
  };
};

export const clearError = () => {
  return {
    type: Types.CLEAR_ERROR
  };
};
