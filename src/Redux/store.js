// Redux Libaraies
import { createStore, compose } from 'redux';

// Reducers
import MainReducer from './reducer.main';

// using advanced enhancer to solve redux extension break problem
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store
const Store = createStore(MainReducer);

export default Store;
