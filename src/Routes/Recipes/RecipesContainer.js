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
import { useTheme, useMediaQuery } from '@material-ui/core';

const RecipesContainer = props => {
  const {
    search,
    history,
    cleanUp,
    fetchInitialRecipes,
    loading,
    error,
    recipeList,
    sortRecipes,
    recipeSortOption,
    sorted,
    location,
    clearError,
    searchRecipes
  } = props;
  // speedDial show state
  const [showDial, setShowDial] = useState(false);

  // handle check if should loadmore
  const [isLoadable, setIsLoadable] = useState(true);

  // state for search field
  const [searchInput, setSearchInput] = useState('');

  // get current view port size and determine how many recipes to query
  const theme = useTheme();
  const midScreen = useMediaQuery(theme.breakpoints.up('md'));
  const bigScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [querySize, setQuerySize] = useState(10);

  useEffect(() => {
    if (bigScreen) {
      setQuerySize(20);
    } else if (midScreen) {
      setQuerySize(15);
    } else {
      setQuerySize(10);
    }
  }, [bigScreen, midScreen]);

  useEffect(() => {
    if (location.pathname === '/recipes') {
      setIsLoadable(true);
    } else {
      setIsLoadable(false);
    }
  }, [location]);

  // left side array and rightside array
  // mid for ipad screen size
  // big for desktop screen size
  const [displayArray, setDisplayArray] = useState({
    left: [],
    right: [],
    mid: [],
    big: []
  });

  // split recipeList into left and right array for better ui
  useEffect(() => {
    if (recipeList.length > 0) {
      if (querySize === 20) {
        // split into 4 arrays for desktop screens
        const reducedRecipe = recipeList.reduce(
          (prev, curr, idx, self) => {
            if (
              prev.left.length === prev.right.length &&
              prev.left.length === prev.mid.length &&
              prev.left.length === prev.big.length
            ) {
              prev.left.push(curr);
            } else if (
              prev.right.length === prev.mid.length &&
              prev.right.length === prev.big.length
            ) {
              prev.right.push(curr);
            } else if (prev.mid.length === prev.big.length) {
              prev.mid.push(curr);
            } else {
              prev.big.push(curr);
            }
            return prev;
          },
          { left: [], right: [], mid: [], big: [] }
        );
        setDisplayArray(prevArray => ({
          ...prevArray,
          left: [...reducedRecipe.left],
          right: [...reducedRecipe.right],
          mid: [...reducedRecipe.mid],
          big: [...reducedRecipe.big]
        }));
      } else if (querySize === 15) {
        // ipad screen split to three
        const reducedRecipe = recipeList.reduce(
          (prev, curr, idx, self) => {
            if (
              prev.left.length === prev.right.length &&
              prev.left.length === prev.mid.length
            ) {
              prev.left.push(curr);
            } else if (prev.right.length === prev.mid.length) {
              prev.right.push(curr);
            } else {
              prev.mid.push(curr);
            }
            return prev;
          },
          { left: [], right: [], mid: [] }
        );
        setDisplayArray(prevArray => ({
          ...prevArray,
          left: [...reducedRecipe.left],
          right: [...reducedRecipe.right],
          mid: [...reducedRecipe.mid],
          big: []
        }));
      } else {
        // if mobile screen, split to 2 arrays
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
          right: [...reducedRecipe.right],
          mid: [],
          big: []
        }));
      }
    }
  }, [recipeList, querySize]);

  // onmount, fetch recipe based on screen size
  useEffect(() => {
    fetchInitialRecipes(querySize);
  }, [fetchInitialRecipes, querySize]);

  // clean up on unmount
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  // handle speedial click to sort recipe request
  const handleSortRecipes = typeNum => {
    const orderBy = orderByArr[typeNum];
    if (typeNum === -1) {
      setShowDial(false);
    } else if (typeNum === 4) {
      cleanUp();
      if (search) {
        searchRecipes(search, querySize);
      } else {
        fetchInitialRecipes(querySize);
      }
    } else {
      sortRecipes(orderBy, querySize);
    }
  };

  // push to card details
  const handleCardClick = recipeId => {
    history.push(`/recipes/detail/${recipeId}`);
  };

  // used to display a selected indicator
  const getCurrentSortOption = () => {
    if (sorted) {
      return recipeSortOption;
    } else {
      return '';
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    if (!searchInput) {
      fetchInitialRecipes(querySize);
    } else {
      searchRecipes(searchInput, querySize);
    }
    setSearchInput('');
  };

  // clear the search
  const resetSearch = () => {
    setSearchInput('');
    fetchInitialRecipes();
  };

  return (
    <>
      <PageSpinner loading={loading} />
      <ErrorSnack handleClose={clearError} error={error} />
      <Recipes
        midScreen={midScreen}
        bigScreen={bigScreen}
        search={search}
        resetSearch={resetSearch}
        handleSearch={handleSearch}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleCardClick={handleCardClick}
        showDial={showDial}
        setShowDial={setShowDial}
        displayArray={displayArray}
        handleSortRecipes={handleSortRecipes}
        isLoadable={isLoadable}
        getCurrentSortOption={getCurrentSortOption}
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
    loadMoreLoading: state.List.loadMoreLoading,
    search: state.List.search
  };
};

const mapDispatchTopProps = dispatch => {
  return bindActionCreators(
    {
      fetchInitialRecipes: ListActions.fetchInitialRecipes,
      cleanUp: ListActions.cleanUp,
      loadMoreRecipes: ListActions.loadMoreRecipes,
      sortRecipes: ListActions.sortRecipes,
      clearError: ListActions.clearError,
      searchRecipes: ListActions.searchRecipes
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchTopProps)(RecipesContainer);
