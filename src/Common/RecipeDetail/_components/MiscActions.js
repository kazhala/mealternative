import React from 'react';
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
    handleLikeAction
  } = props;

  return (
    <div className={classes.detailMiscRoot}>
      <div className={classes.detailContainer}>
        <Rating name='recipe-rating' value={rating} />({rating})
      </div>
      <div className={classes.detailContainer}>
        <div className={`${classes.detailIconText} ${classes.detailBookMark}`}>
          {booked ? (
            <BookmarkBorder color='primary' />
          ) : (
            <BookmarkBorderOutlined />
          )}
          ({bookmarks})
        </div>
        <div onClick={handleLikeAction} className={classes.detailIconText}>
          {liked ? <ThumbUp color='primary' /> : <ThumbUpOutlined />}({likes})
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
  handleLikeAction: PropTypes.func.isRequired
};

export default MiscActions;
