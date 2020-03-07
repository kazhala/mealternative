import * as Types from './types';

export const getLocation = payload => {
  return {
    type: Types.SET_CURRENT_LOCATION,
    payload
  };
};

export const locationError = payload => {
  return {
    type: Types.LOCATION_ERROR,
    payload
  };
};

export const CLEAR_ERROR = () => {
  return {
    type: Types.CLEAR_ERROR
  };
};
