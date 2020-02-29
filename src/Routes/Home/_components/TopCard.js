/*
  Card used in the top part of the homepage
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { Typography } from '@material-ui/core';

const TopCard = props => {
  const { onClick, classes, title, imgUrl, description, disable } = props;

  return (
    <div
      onClick={onClick}
      className={classes.topCard}
      style={{
        backgroundImage: `url(${imgUrl})`,
        pointerEvents: disable ? 'none' : 'auto',
        opacity: disable ? '0.7' : '1'
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
  imgUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disable: PropTypes.any
};

export default TopCard;
