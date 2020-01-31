import * as Types from './types';

const initialState = {
  loading: false,
  error: '',
  recipeDetails: {}
};

const RecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default RecipeReducer;
