import React from 'react';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';
import { BookmarkBorderOutlined, ThumbUpOutlined } from '@material-ui/icons';

const MiscActions = props => {
  const { classes, rating } = props;

  return (
    <div className={classes.detailMiscRoot}>
      <div className={classes.detailContainer}>
        <Rating name='recipe-rating' value={rating} />({rating})
      </div>
      <div className={classes.detailContainer}>
        <BookmarkBorderOutlined className={classes.detailBookMark} />
        <ThumbUpOutlined className={classes.detailLike} />
      </div>
    </div>
  );
};

MiscActions.propTypes = {
  classes: PropTypes.object.isRequired,
  rating: PropTypes.number.isRequired
};

export default MiscActions;
