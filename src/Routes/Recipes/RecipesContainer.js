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
    } else if (typeNum === 4) {
      cleanUp();
      if (search) {
        searchRecipes(search);
      } else {
        fetchInitialRecipes();
      }
    } else {
      sortRecipes(orderBy);
    }
  };

  const handleCardClick = recipeId => {
    history.push(`/recipes/detail/${recipeId}`);
  };

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
      fetchInitialRecipes();
    } else {
      searchRecipes(searchInput);
    }
    setSearchInput('');
  };

  const resetSearch = () => {
    setSearchInput('');
    fetchInitialRecipes();
  };

  return (
    <>
      <PageSpinner loading={loading} />
      <ErrorSnack handleClose={clearError} error={error} />
      <Recipes
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
