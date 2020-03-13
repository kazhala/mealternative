/*
  Category route container
  display all recipes related to a category
*/

// react
import React, { useEffect, useState, useRef, useCallback } from 'react';

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
import { orderByArr } from '../../Common/DefaultValues/RecipeOptions';
import { useMediaQuery, useTheme } from '@material-ui/core';
import useScreenSize from '../../Hooks/useScreenSize';
import useBreakArrays from '../../Hooks/useBreakArrays';

const CategoryContainer = props => {
  const {
    sortRecipes,
    location,
    history,
    getCategoryRecipes,
    loading,
    error,
    cleanUp,
    clearError,
    recipes,
    loadMore,
    resetSort,
    hasNextPage
  } = props;

  // used to detect changes in category id in the query string
  const [categoryId, setCategoryId] = useState(null);
  // check if the page should be able to load more
  const [isLoadable, setIsLoadable] = useState(true);
  // sort dial open state
  const [showDial, setShowDial] = useState(false);

  useEffect(() => {
    if (location.pathname === '/category') {
      setIsLoadable(true);
    } else {
      setIsLoadable(false);
    }
  }, [location]);

  // create a ref for top element in the page
  // used to scroll to top
  const topElementRef = useRef(null);

  // get current view port size and determine how many recipes to query
  const theme = useTheme();
  const midScreen = useMediaQuery(theme.breakpoints.up('md'));
  const bigScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const hugScreen = useMediaQuery(theme.breakpoints.up('xl'));

  const querySize = useScreenSize(hugScreen, bigScreen, midScreen);

  const displayArray = useBreakArrays(recipes, querySize);

  // set the category id, only re-render if category id changes in the querystring
  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    if (!queryParams.id) {
      history.replace('/');
    } else if (queryParams.id !== categoryId) {
      setCategoryId(queryParams.id);
    }
  }, [location, history, categoryId]);

  // once categoryId is set, fetch data
  useEffect(() => {
    if (categoryId) {
      getCategoryRecipes(categoryId, querySize);
    }
  }, [categoryId, getCategoryRecipes, querySize]);

  const scrollToTop = useCallback(() => {
    topElementRef.current.scrollTo(0, 0);
  }, []);

  // scroll to top once category is changed to another
  useEffect(() => {
    scrollToTop();
  }, [categoryId, scrollToTop]);

  const handleCardClick = id => {
    history.push({
      pathname: `/category/detail/${id}`,
      search: `?id=${categoryId}`,
      state: { url: '/category' }
    });
  };

  const handleLoadMore = () => {
    loadMore();
  };

  // handle speedial click to sort recipe request
  const handleSortRecipes = typeNum => {
    const orderBy = orderByArr[typeNum];
    if (typeNum === -1) {
      setShowDial(false);
    } else if (typeNum === 4) {
      clearError();
      resetSort();
      getCategoryRecipes(categoryId, querySize);
      scrollToTop();
    } else {
      sortRecipes(orderBy);
      getCategoryRecipes(categoryId, querySize);
      scrollToTop();
    }
  };

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <>
      <PageSpinner loading={loading} />
      <ErrorSnack error={error} handleClose={clearError} />
      <Category
        hasNextPage={hasNextPage}
        midScreen={midScreen}
        isLoadable={isLoadable}
        handleLoadMore={handleLoadMore}
        handleCardClick={handleCardClick}
        displayArray={displayArray}
        topElementRef={topElementRef}
        showDial={showDial}
        setShowDial={setShowDial}
        handleSortRecipes={handleSortRecipes}
        {...props}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.Category.loading,
    error: state.Category.error,
    recipes: state.Category.recipes,
    category: state.Category.category,
    loadMoreLoading: state.Category.loadMoreLoading,
    sortOption: state.Category.sortOption,
    hasNextPage: state.Category.hasNextPage
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCategoryRecipes: CategoryActions.getCategoryRecipes,
      cleanUp: CategoryActions.cleanUp,
      clearError: CategoryActions.clearError,
      loadMore: CategoryActions.loadMore,
      sortRecipes: CategoryActions.sortRecipes,
      resetSort: CategoryActions.resetSort
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);
