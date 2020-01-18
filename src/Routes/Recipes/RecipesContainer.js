/*
  Recipe container
*/
import React, { useState } from 'react';
import Recipes from './Recipes';

const RecipesContainer = props => {
  const [sortOption, setSortOption] = useState({
    show: false,
    optionNum: 0,
    reversed: {}
  });

  return (
    <Recipes sortOption={sortOption} setSortOption={setSortOption} {...props} />
  );
};

export default RecipesContainer;
