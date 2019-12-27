import React from 'react';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import useStyles from './Style';

const ComboRating = props => {
  const classes = useStyles();
  const { rating, price } = props;

  return (
    <Box className={classes.comboRatingRoot}>
      ({rating})
      <Rating
        className={classes.rating}
        name='restaurant rating'
        value={rating}
        precision={0.1}
        readOnly
      />
      ({price})
    </Box>
  );
};

ComboRating.propTypes = {
  rating: PropTypes.number,
  price: PropTypes.string
};

ComboRating.defaultProps = {
  rating: 0,
  price: '$'
};

export default ComboRating;
