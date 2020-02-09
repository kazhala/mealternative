import * as Types from './types';

const initialState = {
  loading: false,
  error: '',
  userDetails: {}
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.PROFILE_BEGIN:
      return { ...state, loading: true, error: '' };
    case Types.PROFILE_ERROR:
      return { ...state, error: action.payload, loading: false };
    case Types.PROFILE_CLEAN:
      return { ...state, loading: false, error: '', userDetails: {} };
    case Types.PROFILE_STORE_USER:
      return {
        ...state,
        error: '',
        loading: false,
        userDetails: action.payload
      };
    default:
      return state;
  }
};

export default ProfileReducer;
