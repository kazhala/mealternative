import React from 'react';
import useStyles from './Style';

const VerticalOrDivider = props => {
  const classes = useStyles();
  return <div className={classes.verticalOrDivider}>or</div>;
};

export default VerticalOrDivider;
