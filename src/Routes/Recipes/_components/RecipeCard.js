/*
  Individual recipe card
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { Typography, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { BookmarksOutlined, ThumbUpOutlined } from '@material-ui/icons';

const RecipeCard = props => {
  const {
    photoUrl,
    handleCardClick,
    recipeId,
    bookmarks,
    rating,
    classes,
    title,
    name,
    likes,
    thumbnailUrl
  } = props;

  return (
    <div
      onClick={() => handleCardClick(recipeId)}
      className={classes.recipeCardRoot}
    >
      {/* thumbnail */}
      <img
        alt='recipe thumbnail'
        src={thumbnailUrl}
        className={classes.recipeCardImage}
      />

      {/* title */}
      <Typography
        className={classes.recipeCardTitle}
        component='div'
        variant='subtitle1'
      >
        {title}
      </Typography>
      {/* rating */}
      <div className={classes.recipeCardRow}>
        <div className={classes.recipeCardWithIcon}>
          <Rating
            precision={0.5}
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
          <Avatar src={photoUrl} className={classes.recipeCardAvatar} />
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
  rating: PropTypes.number.isRequired,
  recipeId: PropTypes.string.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  photoUrl: PropTypes.string.isRequired
};

export default RecipeCard;
