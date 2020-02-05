import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';
import {
  BookmarkBorderOutlined,
  ThumbUpOutlined,
  Bookmark,
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
    handleBookAction,
    handleRateAction
  } = props;

  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likes);

  const [isBooked, setIsBooked] = useState(booked);
  const [bookCount, setBookCount] = useState(bookmarks);

  const [ratingValue, setRatingValue] = useState(rating);

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

  const handleRatingChange = (e, value) => {
    setRatingValue(value);
    handleRateAction(value);
  };

  return (
    <div className={classes.detailMiscRoot}>
      <div className={classes.detailContainer}>
        <Rating
          onChange={handleRatingChange}
          name='recipe-rating'
          value={ratingValue}
        />
        ({ratingValue})
      </div>
      <div className={classes.detailContainer}>
        <div
          onClick={handleBookClick}
          className={`${classes.detailIconText} ${classes.detailBookMark}`}
        >
          {isBooked ? <Bookmark color='primary' /> : <BookmarkBorderOutlined />}
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
  handleBookAction: PropTypes.func.isRequired,
  handleRateAction: PropTypes.func.isRequired
};

export default MiscActions;
