/*
  The root reducer
*/
import { combineReducers } from 'redux';

import AuthReducer from './authentication';
import LocationReducer from './location';
import CreateReducer from './create';
import ListReducer from './list';

const MainReducer = combineReducers({
  Auth: AuthReducer,
  Location: LocationReducer,
  Create: CreateReducer,
  List: ListReducer
});

export default MainReducer;
