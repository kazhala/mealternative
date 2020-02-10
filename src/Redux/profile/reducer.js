import * as Types from './types';

const initialState = {
  loading: false,
  error: '',
  userDetails: {},
  detailLoading: false,
  loadingText: ''
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.DETAIL_BEGIN:
      return { ...state, detailLoading: true, error: '' };
    case Types.PROFILE_BEGIN:
      return { ...state, loading: true, error: '' };
    case Types.PROFILE_LOADING_TEXT:
      return { ...state, loadingText: action.payload };
    case Types.PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        detailLoading: false,
        loadingText: ''
      };
    case Types.PROFILE_CLEAN:
      return {
        ...state,
        loading: false,
        error: '',
        userDetails: {},
        detailLoading: false,
        loadingText: ''
      };
    case Types.PROFILE_STORE_USER:
      return {
        ...state,
        error: '',
        loading: false,
        userDetails: action.payload,
        detailLoading: false,
        loadingText: ''
      };
    default:
      return state;
  }
};

export default ProfileReducer;
