import React from 'react';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';
import { BookmarkBorderOutlined, ThumbUpOutlined } from '@material-ui/icons';

const MiscActions = props => {
  const { classes, rating, likes, bookmarks } = props;

  return (
    <div className={classes.detailMiscRoot}>
      <div className={classes.detailContainer}>
        <Rating name='recipe-rating' value={rating} />({rating})
      </div>
      <div className={classes.detailContainer}>
        <div className={`${classes.detailContainer} ${classes.detailBookMark}`}>
          <BookmarkBorderOutlined />({bookmarks})
        </div>
        <div className={classes.detailContainer}>
          <ThumbUpOutlined />({likes})
        </div>
      </div>
    </div>
  );
};

MiscActions.propTypes = {
  classes: PropTypes.object.isRequired,
  rating: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  bookmarks: PropTypes.number.isRequired
};

export default MiscActions;
