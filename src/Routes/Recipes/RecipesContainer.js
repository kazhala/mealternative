/*
  Recipe container
*/

// react
import React, { useState, useEffect } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListActions } from '../../Redux/list';

// components
import Recipes from './Recipes';
import PageSpinner from '../../Common/Spinner/PageSpinner';
import ErrorSnack from '../../Common/ErrorModal/ErrorSnack';

// misc
import { orderByArr } from '../../Common/DefaultValues/RecipeOptions';

const RecipesContainer = props => {
  const {
    history,
    cleanUp,
    fetchInitialRecipes,
    loading,
    error,
    recipeList,
    sortRecipes,
    recipeSortOption,
    sorted,
    location
  } = props;
  // speedDial show state
  const [showDial, setShowDial] = useState(false);

  // handle check if should loadmore
  const [isLoadable, setIsLoadable] = useState(true);

  useEffect(() => {
    if (location.pathname === '/recipes') {
      setIsLoadable(true);
    } else {
      setIsLoadable(false);
    }
  }, [location]);

  // left side array and rightside array
  const [displayArray, setDisplayArray] = useState({
    left: [],
    right: []
  });

  // split recipeList into left and right array for better ui
  useEffect(() => {
    if (recipeList.length > 0) {
      const reducedRecipe = recipeList.reduce(
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
  }, [recipeList]);

  // onmount, fetch recipe, unmount cleanup
  useEffect(() => {
    fetchInitialRecipes();
    return () => {
      cleanUp();
    };
  }, [fetchInitialRecipes, cleanUp]);

  // handle speedial click to sort recipe request
  const handleSortRecipes = typeNum => {
    const orderBy = orderByArr[typeNum];
    if (typeNum === -1) {
      setShowDial(false);
    } else if (typeNum === 5) {
      cleanUp();
      fetchInitialRecipes();
    } else {
      sortRecipes(getOrderByStr(orderBy));
    }
  };

  // check reverse sort
  const getOrderByStr = orderBy => {
    if (
      orderBy === '-rating' ||
      orderBy === '-likes' ||
      orderBy === '-bookmarks'
    ) {
      return orderBy;
    }
    if (sorted && orderBy === recipeSortOption) {
      if (orderBy.includes('-')) {
        return orderBy.substring(1);
      } else {
        return '-' + orderBy;
      }
    } else {
      return orderBy;
    }
  };

  const handleCardClick = recipeId => {
    history.push(`/recipes/detail/${recipeId}`);
  };

  return (
    <>
      <PageSpinner loading={loading} />
      <ErrorSnack handleClose={cleanUp} error={error} />
      <Recipes
        handleCardClick={handleCardClick}
        showDial={showDial}
        setShowDial={setShowDial}
        displayArray={displayArray}
        handleSortRecipes={handleSortRecipes}
        isLoadable={isLoadable}
        {...props}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: state.List.error,
    loading: state.List.loading,
    recipeList: state.List.recipeList,
    recipePage: state.List.recipePage,
    recipeSortOption: state.List.recipeSortOption,
    sorted: state.List.sorted,
    loadMoreLoading: state.List.loadMoreLoading
  };
};

const mapDispatchTopProps = dispatch => {
  return bindActionCreators(
    {
      fetchInitialRecipes: ListActions.fetchInitialRecipes,
      cleanUp: ListActions.cleanUp,
      loadMoreRecipes: ListActions.loadMoreRecipes,
      sortRecipes: ListActions.sortRecipes
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchTopProps)(RecipesContainer);
