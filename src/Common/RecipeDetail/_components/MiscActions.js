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
  const { liked, booked, classes, rating, likes, bookmarks } = props;

  return (
    <div className={classes.detailMiscRoot}>
      <div className={classes.detailContainer}>
        <Rating name='recipe-rating' value={rating} />({rating})
      </div>
      <div className={classes.detailContainer}>
        <div className={`${classes.detailContainer} ${classes.detailBookMark}`}>
          {booked ? (
            <BookmarkBorder color='primary' />
          ) : (
            <BookmarkBorderOutlined />
          )}
          ({bookmarks})
        </div>
        <div className={classes.detailContainer}>
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
  liked: PropTypes.bool.isRequired,
  booked: PropTypes.bool.isRequired
};

export default MiscActions;
