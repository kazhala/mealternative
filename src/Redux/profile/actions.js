import * as Types from './types';

export const getProfileDetails = userId => {
  return {
    type: Types.PROFILE_GET_USER,
    payload: userId
  };
};

export const cleanUp = () => {
  return {
    type: Types.PROFILE_CLEAN
  };
};

export const updateProfileDetails = payload => {
  return {
    type: Types.PROFILE_UPDATE_USER,
    payload
  };
};
