import React from 'react';
import useStyles from './Style';
import { Button } from '@material-ui/core';
import SearchInput from '../../Common/Inputs/SearchInput';
import SortMenuDial from './_components/SortMenuDial';
import RecipeCard from './_components/RecipeCard';

const Recipes = props => {
  const { sortOption, setSortOption, displayArray } = props;
  const classes = useStyles();

  const handleScroll = e => {
    const isBottom =
      e.target.scrollHeight - Math.ceil(e.target.scrollTop) ===
      e.target.clientHeight;
    isBottom && console.log('loadmore');
  };

  return (
    <div onScroll={handleScroll} className={classes.recipeRoot}>
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
          {displayArray.left.map((recipe, index) => (
            <RecipeCard
              bookmarks={recipe.bookmarks}
              rating={recipe.rating}
              thumbnailUrl={recipe.thumbImageUrl}
              title={recipe.title}
              name={recipe.postedBy.username}
              likes={recipe.likes}
              key={index}
              classes={classes}
            />
          ))}
        </div>
        <div className={classes.recipeBodyColumn}>
          {displayArray.right.map((recipe, index) => (
            <RecipeCard
              bookmarks={recipe.bookmarks}
              rating={recipe.rating}
              thumbnailUrl={recipe.thumbImageUrl}
              title={recipe.title}
              name={recipe.postedBy.username}
              likes={recipe.likes}
              key={index}
              classes={classes}
            />
          ))}
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
