// import { combineReducers } from 'redux';

const initialState = {
  hello: 1,
  fuck: 2
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// const MainReducer = combineReducers({
//   user: UserReducer
// });

export default UserReducer;
