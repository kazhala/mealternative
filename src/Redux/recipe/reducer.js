import * as Types from './types';

const initialState = {
  loading: false,
  error: '',
  recipeDetails: {}
};

const RecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.RECIPE_BEGIN:
      return { ...state, loading: true };
    case Types.RECIPE_CLEAR:
      return { ...state, loading: false, error: '' };
    case Types.RECIPE_ERROR:
      return { ...state, error: action.payload, loading: false };
    case Types.FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        recipeDetails: { ...action.payload }
      };
    default:
      return state;
  }
};

export default RecipeReducer;
