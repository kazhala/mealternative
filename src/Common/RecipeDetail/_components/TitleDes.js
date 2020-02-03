import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const TitleDes = props => {
  const { classes } = props;

  return (
    <div className={classes.detailTitleDes}>
      <Typography variant='h3'>Title</Typography>
      <Typography variant='caption'>
        Poor discussion involve garden anything contain hear. Owner six either
        add draw area buy. Suddenly democratic all simply later.
      </Typography>
    </div>
  );
};

TitleDes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default TitleDes;
