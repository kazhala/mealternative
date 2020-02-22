/*
  category component to display all the categories
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { Typography } from '@material-ui/core';
import RecipeCard from '../../Common/RecipeCard/RecipeCard';

// misc
import useStyles from './Style';

const Category = props => {
  const { displayArray, category } = props;
  const classes = useStyles();

  console.log(displayArray);

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
                  handleCardClick={() => console.log('Yes')}
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
                  handleCardClick={() => console.log('Yes')}
                  photoUrl={recipe.postedBy.photoUrl}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Category.propTypes = {
  displayArray: PropTypes.objectOf(PropTypes.array).isRequired,
  category: PropTypes.object.isRequired
};

export default Category;
