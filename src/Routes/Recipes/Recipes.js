/*
  list recipes component
*/

// react
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

// components
import { Button } from '@material-ui/core';
import SearchInput from '../../Common/Inputs/SearchInput';
import SortMenuDial from './_components/SortMenuDial';
import RecipeCard from './_components/RecipeCard';
import LoadMoreSpinner from '../../Common/Spinner/LoadMoreSpinner';
import RecipeDetailContainer from '../../Common/RecipeDetail/RecipeDetailContainer';

// misc
import useStyles from './Style';

const Recipes = props => {
  const {
    handleCardClick,
    showDial,
    setShowDial,
    displayArray,
    loadMoreRecipes,
    handleSortRecipes,
    loadMoreLoading,
    isLoadable
  } = props;
  const classes = useStyles();

  // check if bottom, perform load more
  const handleScroll = e => {
    if (isLoadable) {
      const isBottom =
        e.target.scrollHeight - Math.ceil(e.target.scrollTop) ===
        e.target.clientHeight;
      isBottom && loadMoreRecipes();
    }
  };

  return (
    <div onScroll={handleScroll} className={classes.recipeRoot}>
      {/* search field */}
      <div className={classes.recipeSearchRoot}>
        <SearchInput
          placeholder='Search Recipe..'
          classes={classes.recipeSearchField}
        />
        <Button variant='contained' color='primary'>
          Search
        </Button>
      </div>
      {/* display array of recipes */}
      <div className={classes.recipeBodyRoot}>
        <div className={classes.recipeBodyColumn}>
          {displayArray.left.map((recipe, index) => (
            <RecipeCard
              handleCardClick={handleCardClick}
              recipeId={recipe._id}
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
              handleCardClick={handleCardClick}
              recipeId={recipe._id}
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

      {/* loadmore spinner */}
      <LoadMoreSpinner
        textAlt="You've reached the bottom"
        loading={loadMoreLoading}
      />
      <Route
        path='/recipes/detail/:recipeid'
        render={props => <RecipeDetailContainer {...props} />}
      />

      {/* speedDial */}
      <SortMenuDial
        classes={classes}
        showDial={showDial}
        setShowDial={setShowDial}
        handleSortRecipes={handleSortRecipes}
      />
    </div>
  );
};

Recipes.propTypes = {
  showDial: PropTypes.bool.isRequired,
  setShowDial: PropTypes.func.isRequired,
  displayArray: PropTypes.objectOf(PropTypes.array).isRequired,
  handleSortRecipes: PropTypes.func.isRequired,
  isLoadable: PropTypes.bool.isRequired
};

export default Recipes;
