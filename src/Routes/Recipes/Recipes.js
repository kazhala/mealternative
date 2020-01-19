import React from 'react';
import useStyles from './Style';
import { Button } from '@material-ui/core';
import SearchInput from '../../Common/Inputs/SearchInput';
import SortMenuDial from './_components/SortMenuDial';
import RecipeCard from './_components/RecipeCard';

const Recipes = props => {
  const { sortOption, setSortOption } = props;
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
      <div className={classes.recipeBodyRoot}>
        <div className={classes.recipeBodyColumn}>
          <RecipeCard classes={classes} />
          <RecipeCard classes={classes} />
          <RecipeCard classes={classes} />
        </div>
        <div className={classes.recipeBodyColumn}>
          <RecipeCard classes={classes} />
          <RecipeCard classes={classes} />
        </div>
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
