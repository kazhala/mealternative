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
import SortMenuDial from '../../Common/RecipeSort/SortMenuDial';
import RecipeCard from '../../Common/RecipeCard/RecipeCard';
import LoadMoreSpinner from '../../Common/Spinner/LoadMoreSpinner';
import RecipeDetailContainer from '../../Common/RecipeDetail/RecipeDetailContainer';

// misc
import useStyles from './Style';
import { handleScroll } from '../../Common/LoadMore/LoadMore';

const Recipes = props => {
  const {
    handleCardClick,
    showDial,
    setShowDial,
    displayArray,
    loadMoreRecipes,
    handleSortRecipes,
    loadMoreLoading,
    isLoadable,
    getCurrentSortOption
  } = props;
  const classes = useStyles();

  return (
    <div
      style={{
        overflowY: isLoadable ? 'scroll' : 'hidden'
      }}
      onScroll={e => handleScroll(e, isLoadable, loadMoreRecipes)}
      className={classes.recipeRoot}
    >
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
              photoUrl={recipe.postedBy.photoUrl}
              likes={recipe.likes}
              key={index}
              classes={classes}
            />
          ))}
        </div>
        <div className={classes.recipeBodyColumn}>
          {displayArray.right.map((recipe, index) => (
            <RecipeCard
              photoUrl={recipe.postedBy.photoUrl}
              handleCardClick={handleCardClick}
              recipeId={recipe._id}
              bookmarks={recipe.bookmarks}
              rating={recipe.rating}
              thumbnailUrl={recipe.thumbImageUrl}
              title={recipe.title}
              name={recipe.postedBy.username}
              likes={recipe.likes}
              key={index}
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
        showDial={showDial}
        setShowDial={setShowDial}
        handleSortRecipes={handleSortRecipes}
        activeSelection={getCurrentSortOption()}
      />
    </div>
  );
};

Recipes.propTypes = {
  showDial: PropTypes.bool.isRequired,
  setShowDial: PropTypes.func.isRequired,
  displayArray: PropTypes.objectOf(PropTypes.array).isRequired,
  handleSortRecipes: PropTypes.func.isRequired,
  isLoadable: PropTypes.bool.isRequired,
  getCurrentSortOption: PropTypes.func.isRequired
};

export default Recipes;
