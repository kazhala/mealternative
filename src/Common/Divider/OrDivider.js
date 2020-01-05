import React from 'react';
import useStyles from './Style';

const OrDivider = props => {
  const classes = useStyles();
  return <div className={classes.orDivider}>or</div>;
};

export default OrDivider;
