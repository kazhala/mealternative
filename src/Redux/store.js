import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import MainReducer from './reducer.main';
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const Store = createStore(MainReducer, enhancer);

export default Store;
