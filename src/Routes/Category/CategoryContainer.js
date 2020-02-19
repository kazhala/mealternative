/*
  Category route container
  display all recipes related to a category
*/

// react
import React, { useEffect } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CategoryActions } from '../../Redux/category';

// components
import Category from './Category';
import PageSpinner from '../../Common/Spinner/PageSpinner';

// misc
import queryString from 'query-string';

const CategoryContainer = props => {
  const { location, history, getCategoryRecipes, loading, error } = props;

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    if (!queryParams.id) {
      history.replace('/');
    } else {
      getCategoryRecipes(queryParams.id);
    }
  }, [location, history, getCategoryRecipes]);

  return (
    <>
      <PageSpinner loading={loading} />
      <Category {...props} />;
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
      getCategoryRecipes: CategoryActions.getCategoryRecipes
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);
