import React from 'react';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';
import { BookmarkBorderOutlined, ThumbUpOutlined } from '@material-ui/icons';

const MiscActions = props => {
  const { classes } = props;

  return (
    <div className={classes.detailMiscRoot}>
      <div className={classes.detailContainer}>
        <Rating />
        (4.0)
      </div>
      <div className={classes.detailContainer}>
        <BookmarkBorderOutlined className={classes.detailBookMark} />
        <ThumbUpOutlined className={classes.detailLike} />
      </div>
    </div>
  );
};

Rating.propTypes = {
  classes: PropTypes.object.isRequired
};

export default MiscActions;
