/*
  The root reducer
*/
import { combineReducers } from 'redux';

import AuthReducer from './authentication';
import LocationReducer from './location';
import CreateReducer from './create';

const MainReducer = combineReducers({
  Auth: AuthReducer,
  Location: LocationReducer,
  Create: CreateReducer
});

export default MainReducer;
