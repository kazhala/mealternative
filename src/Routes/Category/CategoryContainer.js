/*
  Category route container
  display all recipes related to a category
*/

// react
import React, { useEffect, useState, useRef } from 'react';

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
    recipes,
    loadMore
  } = props;

  // determine if the component has mounted
  const [mounted, setMounted] = useState(false);
  // used to detect changes in category id in the query string
  const [categoryId, setCategoryId] = useState(null);
  // check if the page should be able to load more
  const [isLoadable, setIsLoadable] = useState(true);

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

  // left side array and rightside array
  const [displayArray, setDisplayArray] = useState({
    left: [],
    right: []
  });

  // check if id changes or if its mounted
  // avoid un-wanted re-render
  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    if (!mounted || queryParams.id !== categoryId) {
      // if no id found, redirect
      if (!queryParams.id) {
        history.replace('/');
      } else {
        // stop re-rendering
        setMounted(true);
        setCategoryId(queryParams.id);
        // get data through redux
        getCategoryRecipes(queryParams.id);
      }
    }
  }, [location, history, getCategoryRecipes, mounted, categoryId]);

  // scroll to top once category is changed to another
  useEffect(() => {
    topElementRef.current.scrollTo(0, 0);
  }, [categoryId, topElementRef]);

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

  const handleCardClick = id => {
    history.push(`/category/detail/${id}?id=${categoryId}`);
  };

  const handleLoadMore = () => {
    loadMore();
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
        isLoadable={isLoadable}
        handleLoadMore={handleLoadMore}
        handleCardClick={handleCardClick}
        displayArray={displayArray}
        topElementRef={topElementRef}
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
    loadMoreLoading: state.Category.loadMoreLoading
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCategoryRecipes: CategoryActions.getCategoryRecipes,
      cleanUp: CategoryActions.cleanUp,
      clearError: CategoryActions.clearError,
      loadMore: CategoryActions.loadMore
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);
