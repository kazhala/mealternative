import React, { useState } from 'react';
import useStyles from './Style';
import { Button } from '@material-ui/core';
import SearchInput from '../../Common/Inputs/SearchInput';
import SortMenuDial from './_components/SortMenuDial';

const Recipes = props => {
  const classes = useStyles();
  const [sortOption, setSortOption] = useState({
    show: false,
    optionNum: 0,
    reversed: {}
  });

  return (
    <div className={classes.recipeRoot}>
      <div className={classes.recipeSearchRoot}>
        <SearchInput
          placeholder='Search Recipe..'
          classes={classes.recipeSearchField}
        />
        <Button variant='contained' color='primary'>
          Search
        </Button>
      </div>
      <SortMenuDial
        classes={classes}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
    </div>
  );
};

export default Recipes;
