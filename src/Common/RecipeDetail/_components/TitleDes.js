/*
  Title component of detail recipe
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// component
import { Typography } from '@material-ui/core';

const TitleDes = props => {
  const { classes, title, description } = props;

  return (
    <div className={classes.detailTitleDes}>
      <Typography variant='h4'>{title}</Typography>
      <Typography variant='caption'>{description}</Typography>
    </div>
  );
};

TitleDes.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default TitleDes;
