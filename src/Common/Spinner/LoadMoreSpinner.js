/*
  Bottom spinner for load more
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { CircularProgress, Typography } from '@material-ui/core';

// misc
import useStyles from './Style';

const LoadMoreSpinner = props => {
  const { loading, textAlt } = props;
  const classes = useStyles();

  return (
    <div className={classes.loadMoreSpinnerWrapper}>
      {loading ? (
        <CircularProgress color='primary' disableShrink size='2rem' />
      ) : (
        <Typography style={{ opacity: 0.5 }} variant='body2'>
          {textAlt}
        </Typography>
      )}
    </div>
  );
};

LoadMoreSpinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  textAlt: PropTypes.string
};

export default LoadMoreSpinner;
