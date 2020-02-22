/*
  Category route container
  display all recipes related to a category
*/

// react
import React, { useEffect, useState } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CategoryActions } from '../../Redux/category';

// components
import Category from './Category';
import PageSpinner from '../../Common/Spinner/PageSpinner';
import ErrorSnack from '../../Common/ErrorModal/ErrorSnack';

// misc
import queryString from 'query-string';

const CategoryContainer = props => {
  const {
    location,
    history,
    getCategoryRecipes,
    loading,
    error,
    cleanUp,
    clearError,
    recipes
  } = props;

  const [mounted, setMounted] = useState(false);

  // left side array and rightside array
  const [displayArray, setDisplayArray] = useState({
    left: [],
    right: []
  });

  useEffect(() => {
    if (!mounted) {
      const queryParams = queryString.parse(location.search);
      if (!queryParams.id) {
        history.replace('/');
      } else {
        setMounted(true);
        getCategoryRecipes(queryParams.id);
      }
    }
  }, [location, history, getCategoryRecipes, mounted]);

  // split recipes into left and right array for better ui
  useEffect(() => {
    if (recipes.length > 0) {
      const reducedRecipe = recipes.reduce(
        (prev, curr, idx, self) => {
          if (idx % 2 === 0) {
            prev.left.push(curr);
          } else {
            prev.right.push(curr);
          }
          return prev;
        },
        { left: [], right: [] }
      );
      setDisplayArray(prevArray => ({
        ...prevArray,
        left: [...reducedRecipe.left],
        right: [...reducedRecipe.right]
      }));
    }
  }, [recipes]);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <>
      <PageSpinner loading={loading} />
      <ErrorSnack error={error} handleClose={clearError} />
      <Category displayArray={displayArray} {...props} />;
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.Category.loading,
    error: state.Category.error,
    recipes: state.Category.recipes,
    category: state.Category.category
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCategoryRecipes: CategoryActions.getCategoryRecipes,
      cleanUp: CategoryActions.cleanUp,
      clearError: CategoryActions.clearError
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);
