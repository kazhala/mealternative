import * as Types from './types';

const initialState = {
  loading: false,
  error: '',
  userDetails: {},
  detailLoading: false
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.DETAIL_BEGIN:
      return { ...state, detailLoading: true, error: '' };
    case Types.PROFILE_BEGIN:
      return { ...state, loading: true, error: '' };
    case Types.PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        detailLoading: false
      };
    case Types.PROFILE_CLEAN:
      return {
        ...state,
        loading: false,
        error: '',
        userDetails: {},
        detailLoading: false
      };
    case Types.PROFILE_STORE_USER:
      return {
        ...state,
        error: '',
        loading: false,
        userDetails: action.payload,
        detailLoading: false
      };
    default:
      return state;
  }
};

export default ProfileReducer;
