/*
  Recipe container
*/
import React, { useState, useEffect } from 'react';
import Recipes from './Recipes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListActions } from '../../Redux/list';
import PageSpinner from '../../Common/Spinner/PageSpinner';
import ErrorSnack from '../../Common/ErrorModal/ErrorSnack';

const RecipesContainer = props => {
  const { cleanUp, fetchInitialRecipes, loading, error } = props;
  const [sortOption, setSortOption] = useState({
    show: false,
    optionNum: 0,
    reversed: {}
  });

  useEffect(() => {
    fetchInitialRecipes();
    return () => {
      cleanUp();
    };
  }, [fetchInitialRecipes, cleanUp]);

  return (
    <>
      <PageSpinner loading={loading} />
      <ErrorSnack handleClose={cleanUp} error={error} />
      <Recipes
        sortOption={sortOption}
        setSortOption={setSortOption}
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
    recipeSortOption: state.List.recipeSortOption
  };
};

const mapDispatchTopProps = dispatch => {
  return bindActionCreators(
    {
      fetchInitialRecipes: ListActions.fetch_initial_recipes,
      cleanUp: ListActions.cleanUp
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchTopProps)(RecipesContainer);
