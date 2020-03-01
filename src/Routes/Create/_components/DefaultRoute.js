/*
  The default page for create
  contains links to recipe/meal
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { Paper, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { MenuBook, RestaurantMenu } from '@material-ui/icons';
import OrDivider from '../../../Common/Divider/OrDivider';
import VerticalOrDivider from '../../../Common/Divider/VerticalOrDivider';

const DefaultRoute = props => {
  const { classes, history } = props;

  // push to history when navigating to recipe or meal
  const handleRouteClick = path => {
    history.push(path);
  };

  // get the theme and breakpoints for inline responsive design
  // determine display vertifical or horizontal split bar
  const theme = useTheme();
  const displayVerticalDivider = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={classes.defaultRouteRoot}>
      {displayVerticalDivider && (
        <Typography className={classes.defaultRouteTitle} variant='h4'>
          Create something amazing!
        </Typography>
      )}
      {/* the clickable paper for recipe */}
      <Paper
        onClick={() => handleRouteClick('/create/recipe')}
        className={classes.createPaper}
        elevation={3}
      >
        <MenuBook fontSize='inherit' color='primary' />
        <Typography variant='h6'>New Recipe</Typography>
      </Paper>
      {/* based on view port width, display different split bar */}
      {displayVerticalDivider && <VerticalOrDivider />}
      {!displayVerticalDivider && (
        <div className={classes.horizontalOrDividerContainer}>
          <OrDivider />
        </div>
      )}
      {/* the clickable paper for meal */}
      <Paper
        onClick={() => handleRouteClick('/create/meal')}
        className={classes.createPaper}
        elevation={3}
        style={{
          pointerEvents: 'none',
          opacity: '0.5'
        }}
      >
        <RestaurantMenu fontSize='inherit' color='primary' />
        <Typography variant='h6'>Comming soon</Typography>
      </Paper>
    </div>
  );
};

DefaultRoute.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default DefaultRoute;
