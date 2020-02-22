/*
  category component to display all the categories
*/

// react
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

// components
import { Typography } from '@material-ui/core';
import RecipeCard from '../../Common/RecipeCard/RecipeCard';
import RecipeDetailContainer from '../../Common/RecipeDetail/RecipeDetailContainer';

// misc
import useStyles from './Style';

const Category = props => {
  const { displayArray, category, handleCardClick } = props;
  const classes = useStyles();

  return (
    <div className={classes.categoryRoot}>
      {category && (
        <>
          <div
            className={classes.categoryThumb}
            style={{
              backgroundImage: `url(${category.imageUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
              // backgroundAttachment: 'scroll'
            }}
          >
            <Typography className={classes.categoryTitle} variant='h3'>
              {category.name}
            </Typography>
          </div>
          <div className={classes.categoryBody}>
            <div className={classes.categoryBodyColumn}>
              {displayArray.left.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  title={recipe.title}
                  name={recipe.postedBy.username}
                  likes={recipe.likes}
                  thumbnailUrl={recipe.thumbImageUrl}
                  bookmarks={recipe.bookmarks}
                  rating={recipe.rating}
                  recipeId={recipe._id}
                  handleCardClick={handleCardClick}
                  photoUrl={recipe.postedBy.photoUrl}
                />
              ))}
            </div>
            <div className={classes.categoryBodyColumn}>
              {displayArray.right.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  title={recipe.title}
                  name={recipe.postedBy.username}
                  likes={recipe.likes}
                  thumbnailUrl={recipe.thumbImageUrl}
                  bookmarks={recipe.bookmarks}
                  rating={recipe.rating}
                  recipeId={recipe._id}
                  handleCardClick={handleCardClick}
                  photoUrl={recipe.postedBy.photoUrl}
                />
              ))}
            </div>
          </div>
        </>
      )}
      <Route
        path='/category/detail/:recipeid'
        render={props => <RecipeDetailContainer {...props} />}
      />
    </div>
  );
};

Category.propTypes = {
  displayArray: PropTypes.objectOf(PropTypes.array).isRequired,
  category: PropTypes.object.isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default Category;
