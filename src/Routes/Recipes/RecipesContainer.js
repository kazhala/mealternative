/*
  Recipe container
*/

// react
import React, { useState, useEffect, useRef } from 'react';

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
import useBreakArrays from '../../Hooks/useBreakArrays';
import useScreenSize from '../../Hooks/useScreenSize';

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
    searchRecipes,
    hasNextPage
  } = props;

  // speedDial show state
  const [showDial, setShowDial] = useState(false);
  // handle check if should loadmore
  const [isLoadable, setIsLoadable] = useState(true);
  // state for search field
  const [searchInput, setSearchInput] = useState('');

  // top element ref
  const topElementRef = useRef(null);

  // get current view port size and determine how many recipes to query
  const theme = useTheme();
  const midScreen = useMediaQuery(theme.breakpoints.up('md'));
  const bigScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const hugScreen = useMediaQuery(theme.breakpoints.up('xl'));

  // get query size
  const querySize = useScreenSize(hugScreen, bigScreen, midScreen);

  useEffect(() => {
    if (location.pathname === '/recipes') {
      setIsLoadable(true);
    } else {
      setIsLoadable(false);
    }
  }, [location]);

  const displayArray = useBreakArrays(recipeList, querySize);

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
      scrollToTop();
      cleanUp();
      if (search) {
        searchRecipes(search, querySize);
      } else {
        fetchInitialRecipes(querySize);
      }
    } else {
      scrollToTop();
      sortRecipes(orderBy, querySize);
    }
  };

  // push to card details
  const handleCardClick = recipeId => {
    history.push({
      pathname: `/recipes/detail/${recipeId}`,
      state: { url: '/recipes' }
    });
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

  // scroll top when sort option changed
  const scrollToTop = () => {
    topElementRef.current.scrollTo(0, 0);
  };

  return (
    <>
      <PageSpinner loading={loading} />
      <ErrorSnack handleClose={clearError} error={error} />
      <Recipes
        midScreen={midScreen}
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
        topElementRef={topElementRef}
        hasNextPage={hasNextPage}
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
    recipeSortOption: state.List.recipeSortOption,
    sorted: state.List.sorted,
    loadMoreLoading: state.List.loadMoreLoading,
    search: state.List.search,
    hasNextPage: state.List.hasNextPage
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
