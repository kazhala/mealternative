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
  const { cleanUp, fetchInitialRecipes, loading, error, recipeList } = props;
  const [sortOption, setSortOption] = useState({
    show: false,
    optionNum: 0,
    reversed: {}
  });

  const [displayArray, setDisplayArray] = useState({
    left: [],
    right: []
  });

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
        displayArray={displayArray}
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
      fetchInitialRecipes: ListActions.fetchInitialRecipes,
      cleanUp: ListActions.cleanUp,
      loadMoreRecipes: ListActions.loadMoreRecipes
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchTopProps)(RecipesContainer);
