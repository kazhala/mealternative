import React from 'react';
import PropTypes from 'prop-types';
import OrDivider from '../../../Common/Divider/OrDivider';
import { Paper, Typography } from '@material-ui/core';
import { MenuBook, RestaurantMenu } from '@material-ui/icons';

const DefaultRoute = props => {
  const { classes } = props;

  return (
    <div className={classes.defaultRouteRoot}>
      <Paper className={classes.createPaper} elevation={3}>
        <MenuBook fontSize='inherit' color='primary' />
        <Typography variant='h6'>New Recipe</Typography>
      </Paper>
      <OrDivider />
      <Paper className={classes.createPaper} elevation={3}>
        <RestaurantMenu fontSize='inherit' color='primary' />
        <Typography variant='h6'>New Combination</Typography>
      </Paper>
    </div>
  );
};

DefaultRoute.propTypes = {
  classes: PropTypes.object.isRequired
};

export default DefaultRoute;
