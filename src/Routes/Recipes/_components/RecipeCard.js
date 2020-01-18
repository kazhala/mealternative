import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Bookmarks, ThumbUp } from '@material-ui/icons';

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
        variant='subtitle1'
      >
        Title of the card Title of the card Title of the card Title of the card
        Title of the card
      </Typography>
      <div className={classes.recipeCardRow}>
        <div className={classes.recipeCardWithIcon}>
          <Rating value={3} readOnly size='small' />
          (3)
        </div>
        <div className={classes.recipeCardWithIcon}>
          <Bookmarks fontSize='small' />
          20.1k
        </div>
      </div>
      <div className={classes.recipeCardRow}>
        <div className={classes.recipeCardWithIcon}>
          <Avatar className={classes.recipeCardAvatar}>K</Avatar>
          <div>name</div>
        </div>
        <div className={classes.recipeCardWithIcon}>
          <ThumbUp fontSize='small' />
          20.1k
        </div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default RecipeCard;
