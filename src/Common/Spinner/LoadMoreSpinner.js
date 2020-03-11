/*
  Bottom spinner for load more
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { CircularProgress, Typography, Button } from '@material-ui/core';

// misc
import useStyles from './Style';

const LoadMoreSpinner = props => {
  const { hasNextPage, loading, textAlt, handleLoadMore, isDesktop } = props;
  const classes = useStyles();

  return (
    <div className={classes.loadMoreSpinnerWrapper}>
      {loading && (
        <CircularProgress color='primary' disableShrink size='2rem' />
      )}
      {hasNextPage && !isDesktop && !loading && (
        <Button
          variant='outlined'
          className={classes.loadMoreButton}
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
      {!hasNextPage && !loading && (
        <Typography style={{ opacity: 0.5 }} variant='body2'>
          {textAlt}
        </Typography>
      )}
    </div>
  );
};

LoadMoreSpinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  textAlt: PropTypes.string,
  handleLoadMore: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired
};

export default LoadMoreSpinner;
