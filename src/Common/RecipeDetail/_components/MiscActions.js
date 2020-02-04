import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';
import {
  BookmarkBorderOutlined,
  ThumbUpOutlined,
  BookmarkBorder,
  ThumbUp
} from '@material-ui/icons';

const MiscActions = props => {
  const {
    liked,
    booked,
    classes,
    rating,
    likes,
    bookmarks,
    handleLikeAction,
    handleBookAction
  } = props;

  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likes);

  const [isBooked, setIsBooked] = useState(booked);
  const [bookCount, setBookCount] = useState(bookmarks);

  const handleLikeClick = () => {
    isLiked ? setLikeCount(prev => prev - 1) : setLikeCount(prev => prev + 1);
    setIsLiked(prev => !prev);
    handleLikeAction();
  };

  const handleBookClick = () => {
    isBooked ? setBookCount(prev => prev - 1) : setBookCount(prev => prev + 1);
    setIsBooked(prev => !prev);
    handleBookAction();
  };

  return (
    <div className={classes.detailMiscRoot}>
      <div className={classes.detailContainer}>
        <Rating name='recipe-rating' value={rating} />({rating})
      </div>
      <div className={classes.detailContainer}>
        <div
          onClick={handleBookClick}
          className={`${classes.detailIconText} ${classes.detailBookMark}`}
        >
          {isBooked ? (
            <BookmarkBorder color='primary' />
          ) : (
            <BookmarkBorderOutlined />
          )}
          ({bookCount})
        </div>
        <div onClick={handleLikeClick} className={classes.detailIconText}>
          {isLiked ? <ThumbUp color='primary' /> : <ThumbUpOutlined />}(
          {likeCount})
        </div>
      </div>
    </div>
  );
};

MiscActions.propTypes = {
  classes: PropTypes.object.isRequired,
  rating: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  bookmarks: PropTypes.number.isRequired,
  liked: PropTypes.bool,
  booked: PropTypes.bool,
  handleLikeAction: PropTypes.func.isRequired,
  handleBookAction: PropTypes.func.isRequired
};

export default MiscActions;
