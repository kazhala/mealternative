import * as Types from './types';

export const getLocation = payload => {
  return {
    type: Types.SET_CURRENT_LOCATION,
    payload
  };
};
