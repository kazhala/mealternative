import React from 'react';
import useStyles from './Style';

const HomeContainer = props => {
  const classes = useStyles();
  return <div className={classes.root}>HomeContainer</div>;
};

export default HomeContainer;
