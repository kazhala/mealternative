/*
  The redux store
  contains midlleware, dev tool, store object
*/

// redux
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// root reducer
import MainReducer from './reducer.main';
// root saga
import rootSaga from './saga.main';

// initialize saga
const sagaMiddleware = createSagaMiddleware();

// redux dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// compose midlleware
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

// create store
const Store = createStore(MainReducer, enhancer);

// root saga start listen
sagaMiddleware.run(rootSaga);

export default Store;
