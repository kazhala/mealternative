import { combineReducers } from 'redux';

import AuthReducer from './authentication';
import LocationReducer from './location';

const MainReducer = combineReducers({
  Auth: AuthReducer,
  Location: LocationReducer
});

export default MainReducer;
