/*
  Card used in the top part of the homepage
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { Typography } from '@material-ui/core';

const TopCard = props => {
  const { classes, title, imgUrl, description } = props;

  return (
    <div
      className={classes.topCard}
      style={{
        backgroundImage: `url(${imgUrl})`
      }}
    >
      <Typography variant='h4' className={classes.topCardTitle}>
        {title}
      </Typography>
      <Typography variant='caption' className={classes.topCardDescription}>
        {description}
      </Typography>
    </div>
  );
};

TopCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired
};

export default TopCard;
