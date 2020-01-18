import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const RecipeCard = props => {
  const { classes } = props;

  return (
    <div className={classes.recipeCardRoot}>
      <img
        alt='recipe thumbnail'
        src='/img/noimage.png'
        className={classes.recipeCardImage}
      />
      <Typography
        className={classes.recipeCardTitle}
        component='div'
        variant='subtitle2'
      >
        Title of the card Title of the card Title of the card Title of the card
        Title of the card
      </Typography>
      <div className={classes.recipeCardQuality}>
        <div>rating</div>
        <div>bookmarks</div>
      </div>
      <div className={classes.recipeCardCreator}>
        <div>avatar</div>
        <div>name</div>
        <div>likes</div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default RecipeCard;
