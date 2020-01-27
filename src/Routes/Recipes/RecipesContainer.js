/*
  Recipe container
*/
import React, { useState, useEffect } from 'react';
import Recipes from './Recipes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListActions } from '../../Redux/list';

const RecipesContainer = props => {
  const { fetchInitialRecipes } = props;
  const [sortOption, setSortOption] = useState({
    show: false,
    optionNum: 0,
    reversed: {}
  });

  useEffect(() => {
    fetchInitialRecipes();
  }, [fetchInitialRecipes]);

  return (
    <Recipes sortOption={sortOption} setSortOption={setSortOption} {...props} />
  );
};

const mapDispatchTopProps = dispatch => {
  return bindActionCreators(
    {
      fetchInitialRecipes: ListActions.fetch_initial_recipes
    },
    dispatch
  );
};

export default connect(null, mapDispatchTopProps)(RecipesContainer);
