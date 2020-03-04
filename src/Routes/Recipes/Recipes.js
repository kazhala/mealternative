/*
  list recipes component
*/

// react
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

// components
import { Button, Chip } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import SearchInput from '../../Common/Inputs/SearchInput';
import SortMenuDial from '../../Common/RecipeSort/SortMenuDial';
import RecipeCard from '../../Common/RecipeCard/RecipeCard';
import LoadMoreSpinner from '../../Common/Spinner/LoadMoreSpinner';
import RecipeDetailContainer from '../../Common/RecipeDetail/RecipeDetailContainer';

// misc
import useStyles from './Style';
import useInfiniteLoad from '../../Hooks/useInfiniteLoad';

const Recipes = props => {
  const {
    search,
    handleSearch,
    searchInput,
    setSearchInput,
    handleCardClick,
    showDial,
    setShowDial,
    displayArray,
    loadMoreRecipes,
    handleSortRecipes,
    loadMoreLoading,
    isLoadable,
    getCurrentSortOption,
    resetSearch,
    midScreen,
    topElementRef,
    recipeList
  } = props;
  const classes = useStyles();
  const handleScroll = useInfiniteLoad();

  return (
    <div
      style={{
        overflowY: isLoadable ? 'scroll' : 'hidden'
      }}
      onScroll={e => handleScroll(e, isLoadable, loadMoreRecipes)}
      className={classes.recipeRoot}
      ref={topElementRef}
    >
      {/* search field */}
      <form onSubmit={handleSearch} className={classes.recipeSearchRoot}>
        <SearchInput
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder='Search Recipe..'
          classes={classes.recipeSearchField}
        />
        <Button type='submit' variant='contained' color='primary'>
          Search
        </Button>
        {search && (
          <div>
            <Chip
              label={search}
              variant='outlined'
              color='primary'
              onDelete={resetSearch}
              icon={<Search />}
            />
          </div>
        )}
      </form>
      {/* display array of recipes */}
      <div className={classes.recipeBodyRoot}>
        {!midScreen ? (
          <>
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
          </>
        ) : (
          <>
            {recipeList.map((recipe, index) => (
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
          </>
        )}
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
  getCurrentSortOption: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  setSearchInput: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  midScreen: PropTypes.bool,
  topElementRef: PropTypes.any
};

export default Recipes;
