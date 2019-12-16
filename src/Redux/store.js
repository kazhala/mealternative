// Redux Libaraies
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// Reducers
import MainReducer from './reducer.main';
const sagaMiddleware = createSagaMiddleware();

// using advanced enhancer to solve redux extension break problem
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

// Create store
const Store = createStore(MainReducer, enhancer);

export default Store;
