import React from 'react';
import PropTypes from 'prop-types';
import OrDivider from '../../../Common/Divider/OrDivider';
import VerticalOrDivider from '../../../Common/Divider/VerticalOrDivider';
import { Paper, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { MenuBook, RestaurantMenu } from '@material-ui/icons';

const DefaultRoute = props => {
  const { classes, history } = props;

  const handleRouteClick = path => {
    history.push(path);
  };

  const theme = useTheme();
  const displayVerticalDivider = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={classes.defaultRouteRoot}>
      {displayVerticalDivider && (
        <Typography className={classes.defaultRouteTitle} variant='h4'>
          Create something amazing!
        </Typography>
      )}
      <Paper
        onClick={() => handleRouteClick('/create/recipe')}
        className={classes.createPaper}
        elevation={3}
      >
        <MenuBook fontSize='inherit' color='primary' />
        <Typography variant='h6'>New Recipe</Typography>
      </Paper>
      {displayVerticalDivider && <VerticalOrDivider />}
      {!displayVerticalDivider && (
        <div className={classes.horizontalOrDividerContainer}>
          <OrDivider />
        </div>
      )}
      <Paper
        onClick={() => handleRouteClick('/create/meal')}
        className={classes.createPaper}
        elevation={3}
      >
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
