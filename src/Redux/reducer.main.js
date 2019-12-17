import { combineReducers } from 'redux';

import AuthReducer from './authentication/reducer';
import LocationReducer from './location/reducer';

const MainReducer = combineReducers({
  Auth: AuthReducer,
  Location: LocationReducer
});

export default MainReducer;
