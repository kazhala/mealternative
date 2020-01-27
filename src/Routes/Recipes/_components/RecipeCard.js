import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { BookmarksOutlined, ThumbUpOutlined } from '@material-ui/icons';

const RecipeCard = props => {
  const {
    bookmarks,
    rating,
    classes,
    title,
    name,
    likes,
    thumbnailUrl
  } = props;

  return (
    <div className={classes.recipeCardRoot}>
      <img
        alt='recipe thumbnail'
        src={thumbnailUrl}
        className={classes.recipeCardImage}
      />
      <Typography
        className={classes.recipeCardTitle}
        component='div'
        variant='subtitle1'
      >
        {title}
      </Typography>
      <div className={classes.recipeCardRow}>
        <div className={classes.recipeCardWithIcon}>
          <Rating
            className={classes.recipeCardRating}
            value={rating}
            readOnly
            size='small'
          />
          ({rating})
        </div>
        <div className={classes.recipeCardWithIcon}>
          <BookmarksOutlined fontSize='small' />
          {bookmarks}
        </div>
      </div>
      <div className={classes.recipeCardRow}>
        <div className={classes.recipeCardWithIcon}>
          <Avatar className={classes.recipeCardAvatar}>K</Avatar>
          <div>{name}</div>
        </div>
        <div className={classes.recipeCardWithIcon}>
          <ThumbUpOutlined fontSize='small' />
          {likes}
        </div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  bookmarks: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired
};

export default RecipeCard;
