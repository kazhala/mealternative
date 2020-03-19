import React from 'react';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import useStyles from './Style';

const ComboRating = props => {
  const classes = useStyles();
  const { rating, price } = props;

  return (
    <Box className={classes.comboRatingRoot}>
      <Typography className={classes.comboRatingText} variant='caption'>
        ({rating})
      </Typography>
      <Rating
        className={classes.rating}
        name='restaurant rating'
        value={rating}
        precision={0.1}
        readOnly
      />
      <Typography className={classes.comboRatingText} variant='caption'>
        ({price})
      </Typography>
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
