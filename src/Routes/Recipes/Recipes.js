import React from 'react';
import useStyles from './Style';
import { Button, Fab } from '@material-ui/core';
import SearchInput from '../../Common/Inputs/SearchInput';

const Recipes = props => {
  const classes = useStyles();
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
    </div>
  );
};

export default Recipes;
